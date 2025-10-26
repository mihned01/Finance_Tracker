import { onMounted, ref, computed } from 'vue';
import { collection, onSnapshot, doc, addDoc, deleteDoc, updateDoc, query, where, orderBy } from "firebase/firestore";
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
    'Freelance',
    'Investment',
    'Other'
  ]);

 
  onMounted(() => {
    if (currentUser.value) {
      // Create a query to only get current user's transactions
      const q = query(
        collection(db, transactionsFBcollectionRef),
        where("userId", "==", currentUser.value.uid),
        orderBy("createdAt", "desc")
      );
      
      onSnapshot(q, (snapshot) => {
        transactions.value = snapshot.docs.map(doc => ({ 
          id: doc.id, 
          ...doc.data() 
        }));
      });
    }
  });

  // Add transaction 
  const addTransaction = async () => {
    if (!currentUser.value) {
      errorMessage.value = "You must be logged in to add transactions";
      showErrorMessage.value = true;
      return;
    }

    // Validation
    if (!newTransaction.value.amount || !newTransaction.value.description || !newTransaction.value.category) {
      errorMessage.value = "All fields are required!";
      showErrorMessage.value = true;
      return;
    }

    if (parseFloat(newTransaction.value.amount) <= 0) {
      errorMessage.value = "Amount must be greater than 0!";
      showErrorMessage.value = true;
      return;
    }

    try {
      const now = new Date();
      
      await addDoc(collection(db, transactionsFBcollectionRef), {
        amount: parseFloat(newTransaction.value.amount),
        description: newTransaction.value.description.trim(),
        category: newTransaction.value.category,
        type: newTransaction.value.type,
        userId: currentUser.value.uid,
        userEmail: currentUser.value.email,
        createdAt: now.toISOString(),
        date: now.toLocaleDateString('en-GB'), // DD/MM/YYYY format
        time: now.toLocaleTimeString('en-GB'), // HH:MM:SS format
        timestamp: now // For easier querying
      });

      // Reset form
      newTransaction.value = {
        amount: '',
        description: '',
        category: '',
        type: 'expense'
      };
      
      showErrorMessage.value = false;
      console.log("Transaction added successfully!");
      
    } catch (error) {
      console.error("Error adding transaction: ", error);
      errorMessage.value = "Error adding transaction. Please try again.";
      showErrorMessage.value = true;
    }
  };

 
  const totalExpenses = computed(() => {
    return transactions.value
      .filter(t => t.type === 'expense')
      .reduce((total, transaction) => total + transaction.amount, 0);
  });

  const totalIncome = computed(() => {
    return transactions.value
      .filter(t => t.type === 'income')
      .reduce((total, transaction) => total + transaction.amount, 0);
  });

  const balance = computed(() => {
    return totalIncome.value - totalExpenses.value;
  });

  const recentTransactions = computed(() => {
    return transactions.value.slice(0, 5); // Get 5 most recent
  });

  // Delete transaction
  const deleteTransaction = async (id) => {
    try {
      const transactionDoc = doc(db, transactionsFBcollectionRef, id);
      await deleteDoc(transactionDoc);
    } catch (error) {
      console.log("Error deleting transaction: ", error);
    }
  };

  return {
    transactions,
    newTransaction,
    categories,
    errorMessage,
    showErrorMessage,
    addTransaction,
    deleteTransaction,
    totalExpenses,
    totalIncome,
    balance,
    recentTransactions,
    currentUser
  };
}
