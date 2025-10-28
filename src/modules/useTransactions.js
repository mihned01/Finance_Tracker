import { ref, computed, watch, onUnmounted } from 'vue';
import { collection, onSnapshot, addDoc, deleteDoc, doc, query, where, orderBy, serverTimestamp } from "firebase/firestore";
import { db } from './firebase.js';
import { useAuth } from './useAuth.js';

export function useTransactions() {
  const { currentUser } = useAuth();
  
  const transactionsFBcollectionRef = 'transactions';
  
  // Reactive data
  const transactions = ref([]);
  const newTransaction = ref({
    amount: '',
    description: '',
    category: '',
    type: 'expense'
  });
  
  const errorMessage = ref('');
  const showErrorMessage = ref(false);
  const isLoading = ref(false);
  
  const categories = ref([
    'Rent & Bills',
    'Transport',
    'Healthcare',
    'Food & Drinks',
    'Education',
    'Shopping',
    'Travel',
    'Salary',
    'Other'
  ]);

  let unsubscribe = null; 

  const setupTransactionsListener = (user) => {
    if (!user) {
      transactions.value = [];
      return;
    }

    try {
      console.log('Setting up listener for user:', user.uid);
      
      // Remove orderBy to avoid index requirement
      const q = query(
        collection(db, transactionsFBcollectionRef),
        where("userId", "==", user.uid)
        // orderBy("createdAt", "desc") - commented out to avoid index requirement
      );
      
      unsubscribe = onSnapshot(q, 
        (snapshot) => {
          console.log('Snapshot received, docs count:', snapshot.docs.length);
          const transactionData = snapshot.docs.map(doc => {
            const data = doc.data();
            return { 
              id: doc.id, 
              ...data,
              date: data.date || new Date(data.createdAt?.toDate() || new Date()).toLocaleDateString('en-GB'),
              time: data.time || new Date(data.createdAt?.toDate() || new Date()).toLocaleTimeString('en-GB', { 
                hour: '2-digit', 
                minute: '2-digit' 
              })
            };
          });
          
          // Sort by timestamp in JavaScript instead
          transactions.value = transactionData.sort((a, b) => {
            const timeA = a.timestamp || (a.createdAt?.toDate()?.getTime()) || 0;
            const timeB = b.timestamp || (b.createdAt?.toDate()?.getTime()) || 0;
            return timeB - timeA; // Descending order (newest first)
          });
          
          console.log('Transactions updated:', transactions.value.length);
        },
        // ...existing error handling...
      );
    } catch (error) {
      console.error("Error setting up listener:", error);
    }
  };

  const cleanupListener = () => {
    if (unsubscribe) {
      console.log('Cleaning up previous listener');
      unsubscribe();
      unsubscribe = null;
    }
  };

  watch(currentUser, (newUser, oldUser) => {
    console.log('User changed:', { newUser: newUser?.uid, oldUser: oldUser?.uid });
    
    cleanupListener();
    
    if (newUser) {
      setupTransactionsListener(newUser);
    } else {
      transactions.value = [];
    }
  }, { immediate: true });


  onUnmounted(() => {
    console.log('Component unmounting, cleaning up listener');
    cleanupListener();
  });

  const addTransaction = async () => {
    showErrorMessage.value = false;
    errorMessage.value = '';

    if (!currentUser.value) {
      errorMessage.value = "You must be logged in to add transactions";
      showErrorMessage.value = true;
      setTimeout(() => {
        showErrorMessage.value = false;
      }, 3000);
      return;
    }

    // Validation
    if (!newTransaction.value.amount || !newTransaction.value.category) {
      errorMessage.value = "Amount and category are required!";
      showErrorMessage.value = true;
      setTimeout(() => {
        showErrorMessage.value = false;
      }, 3000);
      return;
    }

    if (parseFloat(newTransaction.value.amount) <= 0) {
      errorMessage.value = "Amount must be greater than 0!";
      showErrorMessage.value = true;
      setTimeout(() => {
        showErrorMessage.value = false;
      }, 3000);
      return;
    }

    isLoading.value = true;

    try {
      const now = new Date();
      
      console.log("Adding transaction for user:", currentUser.value.uid);
      
      const docRef = await addDoc(collection(db, transactionsFBcollectionRef), {
        amount: parseFloat(newTransaction.value.amount),
        description: newTransaction.value.description?.trim() || newTransaction.value.category,
        category: newTransaction.value.category,
        type: newTransaction.value.type,
        userId: currentUser.value.uid,
        userEmail: currentUser.value.email,
        createdAt: serverTimestamp(),
        date: now.toLocaleDateString('en-GB'),
        time: now.toLocaleTimeString('en-GB', { 
          hour: '2-digit', 
          minute: '2-digit' 
        }),
        timestamp: now.getTime()
      });

      console.log("Transaction added with ID:", docRef.id);

      // Reset form
      newTransaction.value = {
        amount: '',
        description: '',
        category: '',
        type: 'expense'
      };
      
    } catch (error) {
      console.error("Error adding transaction:", error);
      errorMessage.value = "Error adding transaction. Please try again.";
      showErrorMessage.value = true;
      setTimeout(() => {
        showErrorMessage.value = false;
      }, 5000);
    } finally {
      isLoading.value = false;
    }
  };

  const deleteTransaction = async (id) => {
    if (!currentUser.value) {
      errorMessage.value = "You must be logged in to delete transactions";
      showErrorMessage.value = true;
      return;
    }

    try {
      console.log("Deleting transaction:", id);
      await deleteDoc(doc(db, transactionsFBcollectionRef, id));
      console.log("Transaction deleted successfully");
    } catch (error) {
      console.error("Error deleting transaction:", error);
      errorMessage.value = "Error deleting transaction. Please try again.";
      showErrorMessage.value = true;
      setTimeout(() => {
        showErrorMessage.value = false;
      }, 3000);
    }
  };

  const totalExpenses = computed(() => {
    return transactions.value
      .filter(t => t.type === 'expense')
      .reduce((total, transaction) => total + (transaction.amount || 0), 0);
  });

  const totalIncome = computed(() => {
    return transactions.value
      .filter(t => t.type === 'income')
      .reduce((total, transaction) => total + (transaction.amount || 0), 0);
  });

  const balance = computed(() => {
    return totalIncome.value - totalExpenses.value;
  });

  const recentTransactions = computed(() => {
    return transactions.value.slice(0, 5);
  });

  return {
    transactions,
    newTransaction,
    categories,
    errorMessage,
    showErrorMessage,
    isLoading,
    addTransaction,
    deleteTransaction,
    totalExpenses,
    totalIncome,
    balance,
    recentTransactions,
    currentUser
  };
}