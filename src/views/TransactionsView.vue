<template>
  <div class="dashboard-container">
    <transactionLogForm ref="transactionFormRef" />

    <!-- Side Menu -->
    <div class="side-menu">
      <div class="user-profile">
        <div class="profile-image">
          <img src="@/assets/icons/user-solid.svg" alt="User Profile">
        </div>
        <div class="user-info">
          <h2>{{ currentUser?.email }}</h2>
          <p>Balance: DK {{ balance.toFixed(2) }}</p>
        </div>
      </div>

      <nav class="menu-items">
        <RouterLink to="/dashboard" class="menu-item">
          <img src="@/assets/icons/house-regular-full.svg" alt="Dashboard">
          Dashboard
        </RouterLink>
        <RouterLink to="/transactions" class="menu-item">
          <img src="@/assets/icons/arrow-right-arrow-left-solid-full.svg" alt="Transactions">
          Transactions
        </RouterLink>
        <RouterLink to="/categories" class="menu-item">
          <img src="@/assets/icons/category.svg" alt="Categories">
          Categories
        </RouterLink>
        <RouterLink to="/statistics" class="menu-item">
          <img src="@/assets/icons/chart-simple-solid-full.svg" alt="Statistics">
          Statistics
        </RouterLink>
      </nav>

      <div class="menu-footer">
        <RouterLink to="/profile" class="menu-item">
          <img src="@/assets/icons/user-solid.svg" alt="Profile">
          Profile
        </RouterLink>
        <button @click="handleLogout" class="menu-item logout">
          <img src="@/assets/icons/arrow-right-from-bracket-solid-full.svg" alt="Log out">
          Log out
        </button>
      </div>
    </div>

    <div class="main-content">
      <div class="main-content-container">
        <!-- Header Section -->
        <div class="transactions-header">

          <div class="header">
            <div class="stat-card">
              <p class="stat-label">Total transactions</p>
              <p class="stat-number">{{ transactions.length }}</p>
              <div class="stat-trend-t">
                <img src="@/assets/icons/arrow-trend-up-solid-full.svg" alt="trend">
              </div>
            </div>

            <div class="stat-card expenses">
              <p class="stat-label">Expenses</p>
              <p class="stat-number">DK {{ totalExpenses.toFixed(2) }}</p>
              <p class="stat-subtitle">5% more than previous month</p>
              <div class="stat-trend">
                <img src="@/assets/icons/arrow-trend-down-solid-full.svg" alt="trend">
              </div>
            </div>

            <div class="stat-card income">
              <p class="stat-label">Income</p>
              <p class="stat-number">DK {{ totalIncome.toFixed(2) }}</p>
              <p class="stat-subtitle">5% less than previous month</p>
              <div class="stat-trend">
                <img src="@/assets/icons/arrow-trend-up-solid-full.svg" alt="trend">
              </div>
            </div>
          </div>
        </div>


        <!-- Main Content Area -->
        <div class="content-grid">
          <!-- Add Transaction Form  -->
          <div class="add-transaction-form">
            <h3>Add Transaction</h3>


            <div class="form-group">
              <label>Amount</label>
              <input type="number" placeholder="0.00" class="amount-input" v-model="newTransaction.amount" step="0.01"
                min="0">
            </div>

            <div class="form-group">
              <label>Description</label>
              <input type="text" placeholder="Transaction description" class="description-input"
                v-model="newTransaction.description">
            </div>

            <div class="form-group">
              <label>Category</label>
              <select class="category-select" v-model="newTransaction.category">
                <option value="">Select category</option>
                <option v-for="category in categories" :key="category" :value="category">
                  {{ category }}
                </option>
              </select>
            </div>

            <div class="transaction-type">
              <button class="type-btn expense-btn" :class="{ active: newTransaction.type === 'expense' }"
                @click="setTransactionType('expense')" type="button">
                Expense
              </button>
              <button class="type-btn income-btn" :class="{ active: newTransaction.type === 'income' }"
                @click="setTransactionType('income')" type="button">
                Income
              </button>
            </div>

            <div class="form-footer">
              <p class="auto-date">Date & Time: Auto-generated</p>
              <button class="add-btn" @click="addTransaction">Add Transaction</button>
            </div>
          </div>


          <!-- Transaction History -->
          <div class="history-card">
            <div class="history-header">
              <h3>Recent Transactions</h3>
              <button class="static-theme" @click="viewAllTransactions">View All</button>
            </div>

            <div class="transaction-list">
              <!-- Show message if no transactions -->
              <div v-if="recentTransactions.length === 0" class="no-transactions">
                <p>No transactions yet. Add your first transaction!</p>
              </div>

              <div v-for="transaction in recentTransactions" :key="transaction.id" class="transaction-item">
                <div class="transaction-icon" :class="getCategoryStyle(transaction.category)">
                  <img :src="getCategoryIcon(transaction.category)" :alt="transaction.category" class="category-svg">
                </div>
                <div class="transaction-details">
                  <p class="transaction-name">{{ transaction.category }}</p>
                  <p class="transaction-date">{{ transaction.date }} at {{ transaction.time }}</p>
                </div>
                <div class="transaction-amount" :class="transaction.type + '-amount'">
                  {{ transaction.type === 'income' ? '+' : '-' }} DK {{ transaction.amount.toFixed(2) }}
                </div>
              </div>
            </div>
          </div>

        </div>



        <div class="all-transactions-container" ref="allTransactionsRef">

          <h3>All Transactions</h3>

          <!-- Transaction Cards -->
          <div class="transactions-list" v-if="transactions.length > 0">
            <div v-for="transaction in transactions" :key="transaction.id" class="transaction-card"
              @click="openTransactionModal(transaction)">
              <!-- Transaction Icon -->
              <div class="transaction-icon" :class="getCategoryStyle(transaction.category)">
                <img :src="getCategoryIcon(transaction.category)" :alt="transaction.category" class="category-svg">
              </div>

              <!-- Transaction Details -->
              <div class="transaction-details">
                <div class="transaction-info">
                  <h4 class="transaction-category">{{ transaction.category }}</h4>
                  <p class="transaction-description">{{ transaction.description || 'No description' }}</p>
                  <p class="transaction-datetime">{{ transaction.date }} at {{ transaction.time }}</p>
                </div>
              </div>

              <!-- Transaction Amount -->
              <div class="transaction-amount"
                :class="transaction.type === 'income' ? 'income-amount' : 'expense-amount'">
                {{ transaction.type === 'income' ? '+' : '-' }}DK {{ Math.abs(transaction.amount).toFixed(2) }}
              </div>

            </div>
          </div>

          <!-- No Transactions Message -->
          <div v-else class="no-transactions">
            <p>No transactions found</p>
          </div>


          <!-- Transaction Modal -->
          <transactionLogForm :is-open="isModalOpen" :transaction="selectedTransaction" @close="closeModal"
            @save="handleTransactionSave" @delete="handleTransactionDelete" />

          
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/modules/useAuth'
import { useTransactions } from '@/modules/useTransactions'
import transactionLogForm from '@/components/transactionLogForm.vue'

const router = useRouter()
const { currentUser, logout } = useAuth()
const {
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
  recentTransactions
} = useTransactions()

const handleLogout = async () => {
  await logout()
  router.push('/')
}

const allTransactionsRef = ref(null)

const viewAllTransactions = () => {
  if (allTransactionsRef.value) {
    allTransactionsRef.value.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
}
const setTransactionType = (type) => {
  newTransaction.value.type = type
}

// Helper function for category icons (SVG file paths)
const getCategoryIcon = (category) => {
  const icons = {
    'Food & Drinks': '/src/assets/icons/utensils-solid-full.svg',
    'Transport': '/src/assets/icons/car-solid-full.svg',
    'Shopping': '/src/assets/icons/bag-shopping-solid-full.svg',
    'Education': '/src/assets/icons/book-open-solid-full.svg',
    'Rent & Bills': '/src/assets/icons/bolt-solid-full.svg',
    'Travel': 'src/assets/icons/plane-solid-full.svg',
    'Healthcare': '/src/assets/icons/heart-pulse-solid-full.svg',
    'Salary': '/src/assets/icons/dollar-sign-solid-full.svg',
    'Other': '/src/assets/icons/category.svg'
  };
  return icons[category] || '@/assets/icons/category.svg';
};

// Helper function for category colors/styles
const getCategoryStyle = (category) => {
  const styles = {
    'Food & Drinks': 'food-icon',
    'Transport': 'transport-icon',
    'Shopping': 'shopping-icon',
    'Education': 'education-icon',
    'Rent & Bills': 'housing-icon',
    'Travel': 'travel-icon',
    'Healthcare': 'healthcare-icon',
    'Salary': 'salary-icon',
    'Other': 'other-icon'
  };
  return styles[category] || 'other-icon';
};

// Modal state
const isModalOpen = ref(false)
const selectedTransaction = ref({})

const openTransactionModal = (transaction) => {
  selectedTransaction.value = transaction
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
  selectedTransaction.value = {}
}

// The real-time listener will update the UI automatically
const handleTransactionSave = (updatedTransaction) => {
  console.log('Transaction saved:', updatedTransaction)
}

const handleTransactionDelete = (transactionId) => {
  console.log('Transaction deleted:', transactionId)
}

</script>



<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

#app {
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
}

.dashboard-container {
  display: flex;
  background-color: var(--color-main);
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  margin: 0;
  padding: 0;
}

.side-menu {
  flex: 0 0 20%;
  min-width: 250px;
  background-color: var(--color-main);
  padding: 40px 0 40px 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow-y: auto;
}

.main-content {
  flex: 1;
  background-color: var(--color-main);
  padding: 40px;
  overflow: hidden;
}

.main-content-container {
  width: 100%;
  height: 100%;
  background-color: var(--color-background);
  border: 1px solid #e0e0e0;
  border-radius: 16px;
  padding: 30px;
  overflow-y: auto;
  overflow-x: hidden;
}

.user-profile {
  margin-bottom: 2rem;
}

.profile-image {
  width: 40px;
  height: 40px;
  padding: 10px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.2);
  margin-bottom: 1rem;
}

.user-info h2 {
  font-family: 'Poppins', sans-serif;
  font-size: 18px;
  margin-bottom: 0.5rem;
}

.user-info p {
  font-size: 14px;
  opacity: 0.8;
}

.menu-items {
  margin-top: 40px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem 0.2rem;
  border-radius: 8px;
  color: var(--color-text);
  text-decoration: none;
  font-size: 15px;
  font-family: Poppins, sans-serif;
  font-weight: 500;
  transition: background-color 0.3s;
}

.menu-item:hover {
  color: var(--color-background);
}

.menu-item img {
  width: 25px;
  text-align: center;
}


.menu-footer {
  margin-top: auto;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 1rem;
}

.logout {
  width: 100%;
  border: none;
  background: none;
  cursor: pointer;
  color: var(--color-text);
  font-size: 1rem;
}

.transactions-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 30px;
  gap: 20px;
}


.header {
  display: flex;
  gap: 15px;
}

.stat-card {
  background: var(--color-background);
  width: fit-content;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  padding: 20px;
  min-width: 190px;
  position: relative;
}

.stat-card.expenses {
  background: var(--color-charts-three);
  color: white;
  border: none;
}

.stat-card.income {
  background: var(--color-charts-secondary);
  color: white;
  border: none;
}

.stat-label {
  font-size: 14px;
  margin: 0 0 8px 0;
  opacity: 0.8;
}

.stat-number {
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 4px 0;
}

.stat-subtitle {
  font-size: 10px;
  margin: 0;
  opacity: 0.7;
}

.stat-trend {
  position: absolute;
  top: 15px;
  right: 15px;
  width: 30px;
  height: 30px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.stat-trend img {
  width: 30px;
  height: 30px;
  filter: brightness(0) saturate(100%) invert(100%);
  padding: 4px;
  border-radius: 4px;
}

.stat-trend-t {
  position: absolute;
  top: 15px;
  right: 15px;
  width: 30px;
  height: 30px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.stat-trend-t img {
  width: 30px;
  height: 30px;
  color: black;
  padding: 4px;
  border-radius: 4px;
}

.content-grid {
  display: grid;
  grid-template-columns: 1.7fr 1.3fr;
  gap: 30px;
}

/* Add Transaction Form */
.add-transaction-form {
  background: var(--color-main);
  border-radius: 16px;
  padding: 25px;
  height: fit-content;
}

.add-transaction-form h3 {
  color: var(--color-text);
  font-size: 20px;
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  margin: 0 0 20px 0;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  color: var(--color-text);
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 8px;
}

.amount-input,
.description-input,
.category-select {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid var(--color-secondary-background);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  color: var(--color-text);
  font-size: 14px;
  font-family: Poppins, sans-serif;
}

.amount-input::placeholder,
.description-input::placeholder {
  color: rgba(45, 45, 45, 0.6);
}

.transaction-type {
  display: flex;
  gap: 10px;
  margin: 20px 0;
}

.type-btn {
  flex: 1;
  padding: 10px;
  border: 1px solid var(--color-secondary-background);
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.1);
  color: var(--color-text);
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.type-btn.active,
.type-btn:hover {
  background: var(--color-background);
  color: var(--color-text);
}

.form-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 25px;
}

.auto-date {
  font-size: 12px;
  color: rgba(45, 45, 45, 0.7);
  margin: 0;
}

.add-btn {
  background: var(--color-charts-secondary);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.add-btn:hover {
  background: var(--color-charts-three);
}


/* History Card */
.history-card {
  background: var(--color-background);
  border: 1px solid #e0e0e0;
  border-radius: 16px;
  padding: 25px;
}

.history-card button {
  color: var(--color-text);
  text-decoration: none;
  border: 0.5px solid var(--color-tetx);
  background-color: var(--color-background);
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.history-card button:hover {
  color: var(--color-charts-secondary);

}

.history-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.history-header h3 {
  font-size: 18px;
  font-family: Poppins, sans-serif;
  font-weight: 600;
  color: var(--color-text);
  margin: 0;
}

.transaction-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.transaction-item {
  display: flex;
  align-items: center;
  gap: 15px;
}

/* No transactions message */
.no-transactions {
  text-align: center;
  color: #666;
  font-style: italic;
  padding: 40px 20px;
}

.no-transactions p {
  margin: 0;
  font-size: 14px;
}

/* Transaction icon styling */
.transaction-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  flex-shrink: 0;
}

.category-svg {
  width: 20px;
  height: 20px;
  filter: brightness(0) invert(1);
}

/* Category-specific icon colors */
.food-icon {
  background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%);
}

.transport-icon {
  background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
}

.shopping-icon {
  background: linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%);
}

.travel-icon {
  background: linear-gradient(135deg, #fad0c4 0%, #ffd1ff 100%);
}

.housing-icon {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
}

.education-icon {
  background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
}

.healthcare-icon {
  background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%);
}

.salary-icon {
  background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
}

.other-icon {
  background: linear-gradient(135deg, #9890e3 0%, #b1f4cf 100%);
}

/* Adjust SVG icon colors for light gradient backgrounds */
.food-icon .category-svg,
.travel-icon .category-svg,
.salary-icon .category-svg,
.other-icon .category-svg {
  filter: brightness(0);
}

/* Keep white icons for dark gradient backgrounds */
.transport-icon .category-svg,
.shopping-icon .category-svg,
.housing-icon .category-svg,
.education-icon .category-svg,
.healthcare-icon .category-svg {
  filter: brightness(0) invert(1);
}


/* Transaction details styling */
.transaction-details {
  flex: 1;
  min-width: 0;
}

.transaction-name {
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text);
  margin: 0 0 4px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.transaction-date {
  font-size: 12px;
  color: #666;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}



/* Transaction item layout */
.transaction-item {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 10px 0;
  border-bottom: 1px solid #f0f0f0;
}

.transaction-item:last-child {
  border-bottom: none;
}

.all-transactions-container {
  background: var(--color-background);
  border: 1px solid #e0e0e0;
  border-radius: 16px;
  margin: 30px 0 0 0;
  padding: 25px;
}

.all-transactions-container h3 {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 15px;
  color: var(--color-text);
  font-family: 'Poppins', sans-serif;
}

/* Transaction Cards Styles */
.transactions-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.transaction-card {
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 15px;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  cursor: pointer;
}

.transaction-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* Transaction Icon */
.transaction-icon {
  width: 45px;
  height: 45px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.transaction-icon .category-svg {
  width: 20px;
  height: 20px;
}

/* Category-specific icon colors */
.housing-icon {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
}

.transport-icon {
  background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
}

.healthcare-icon {
  background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%);
}

.education-icon {
  background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
}

.salary-icon {
  background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
}

.food-icon {
  background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%);
}

.shopping-icon {
  background: linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%);
}

.travel-icon {
  background: linear-gradient(135deg, #fad0c4 0%, #ffd1ff 100%);
}

.utilities-icon {
  background: linear-gradient(135deg, #fdbb2d 0%, #22c1c3 100%);
}

.other-icon {
  background: linear-gradient(135deg, #9890e3 0%, #b1f4cf 100%);
}

/* Icon contrast adjustments */
.housing-icon .category-svg,
.salary-icon .category-svg,
.healthcare-icon .category-svg,
.education-icon .category-svg,
.shopping-icon .category-svg,
.utilities-icon .category-svg {
  filter: brightness(0) invert(1);
}

.transport-icon .category-svg,
.food-icon .category-svg,
.travel-icon .category-svg,
.other-icon .category-svg {
  filter: brightness(0);
}

/* Transaction Details */
.transaction-details {
  flex: 1;
  min-width: 0;
}

.transaction-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.transaction-category {
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text);
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.transaction-description {
  font-size: 12px;
  color: #666;
  margin: 0;
  font-weight: 500;
}

.transaction-datetime {
  font-size: 11px;
  color: #999;
  margin: 0;
}

/* Transaction Amount */
.transaction-amount {
  font-size: 14px;
  font-weight: 600;
  white-space: nowrap;
  text-align: right;
  margin-right: 10px;
}

.income-amount {
  color: #06D143;
}

.expense-amount {
  color: #f44336;
}

/* No Transactions */
.no-transactions {
  text-align: center;
  padding: 40px 20px;
  color: #666;
}

.no-transactions p {
  font-size: 16px;
  margin: 0;
}
</style>