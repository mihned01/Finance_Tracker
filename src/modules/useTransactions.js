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
    'Food & Drinks',
    'Transport', 
    'Shopping',
    'Education',
    'Housing',
    'Entertainment',
    'Healthcare',
    'Utilities',
    'Salary',
    'Other'
  ]);

  let unsubscribe = null; // Store unsubscribe function to prevent memory leaks

  // Setup Firebase listener
  const setupTransactionsListener = (user) => {
    if (!user) {
      transactions.value = [];
      return;
    }

    try {
      console.log('Setting up listener for user:', user.uid);
      
      const q = query(
        collection(db, transactionsFBcollectionRef),
        where("userId", "==", user.uid),
        orderBy("createdAt", "desc")
      );
      
      unsubscribe = onSnapshot(q, 
        (snapshot) => {
          console.log('Snapshot received, docs count:', snapshot.docs.length);
          transactions.value = snapshot.docs.map(doc => {
            const data = doc.data();
            return { 
              id: doc.id, 
              ...data,
              // Ensure date and time are properly formatted
              date: data.date || new Date(data.createdAt).toLocaleDateString('en-GB'),
              time: data.time || new Date(data.createdAt).toLocaleTimeString('en-GB', { 
                hour: '2-digit', 
                minute: '2-digit' 
              })
            };
          });
          console.log('Transactions updated:', transactions.value.length);
        },
        (error) => {
          console.error("Error fetching transactions:", error);
          errorMessage.value = "Error loading transactions";
          showErrorMessage.value = true;
          setTimeout(() => {
            showErrorMessage.value = false;
          }, 5000);
        }
      );
    } catch (error) {
      console.error("Error setting up listener:", error);
    }
  };

  // Clean up previous listener
  const cleanupListener = () => {
    if (unsubscribe) {
      console.log('Cleaning up previous listener');
      unsubscribe();
      unsubscribe = null;
    }
  };

  // Watch for currentUser changes
  watch(currentUser, (newUser, oldUser) => {
    console.log('User changed:', { newUser: newUser?.uid, oldUser: oldUser?.uid });
    
    // Always cleanup first
    cleanupListener();
    
    // Setup new listener if user exists
    if (newUser) {
      setupTransactionsListener(newUser);
    } else {
      transactions.value = [];
    }
  }, { immediate: true });

  // Cleanup on component unmount
  onUnmounted(() => {
    console.log('Component unmounting, cleaning up listener');
    cleanupListener();
  });

  // Add transaction with better error handling
  const addTransaction = async () => {
    // Clear previous errors
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
        createdAt: serverTimestamp(), // Use server timestamp for consistency
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

  // Delete transaction with better error handling
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

  // Computed properties
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