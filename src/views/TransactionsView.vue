<template>
  <div class="dashboard-container">
    <!-- Side Menu -->
    <div class="side-menu">
      <div class="user-profile">
        <div class="profile-image">
          <img src="@/assets/icons/user-solid.svg" alt="Profile">
        </div>
        <div class="user-info">
          <h2>{{ currentUser?.email }}</h2>
          <p>Balance: DK 10.000,00</p>
        </div>
      </div>

      <nav class="menu-items">
        <RouterLink to="/dashboard" class="menu-item">
          <img src="@/assets/icons/house-regular-full.svg" alt="Profile">
          Dashboard
        </RouterLink>
        <RouterLink to="/transactions" class="menu-item">
          <img src="@/assets/icons/arrow-right-arrow-left-solid-full.svg" alt="Profile">
          Transactions
        </RouterLink>
        <RouterLink to="/categories" class="menu-item">
          <img src="@/assets/icons/category.svg" alt="Profile">
          Categories
        </RouterLink>
        <RouterLink to="/statistics" class="menu-item">
          <img src="@/assets/icons/chart-simple-solid-full.svg" alt="Profile">
          Statistics
        </RouterLink>
      </nav>

      <div class="menu-footer">
        <RouterLink to="/profile" class="menu-item">
          <img src="@/assets/icons/user-solid.svg" alt="Profile">
          Profile
        </RouterLink>
        <button @click="handleLogout" class="menu-item logout">
          <img src="@/assets/icons/arrow-right-from-bracket-solid-full.svg" alt="Profile">
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
              <p class="stat-number">265</p>
              <div class="stat-trend">
                <img src="@/assets/icons/arrow-trend-up-solid-full.svg" alt="trend">
              </div>
            </div>

            <div class="stat-card expenses">
              <p class="stat-label">Expenses</p>
              <p class="stat-number">4727</p>
              <p class="stat-subtitle">5% more than previous month</p>
              <div class="stat-trend">
                <img src="@/assets/icons/arrow-trend-down-solid-full.svg" alt="trend">
              </div>
            </div>

            <div class="stat-card income">
              <p class="stat-label">Income</p>
              <p class="stat-number">DK 15,000</p>
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
              <button class="static-theme" @click="navigateToCategories">View All</button>
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


        <RouterView />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAuth } from '@/modules/useAuth'
import { useTransactions } from '@/modules/useTransactions'

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

const navigateToCategories = () => {
  router.push('/categories')
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
    'Housing': '/src/assets/icons/house-solid-full.svg',
    'Travel': 'src/assets/icons/plane-solid-full.svg',
    'Healthcare': '/src/assets/icons/heart-pulse-solid-full.svg',
    'Utilities': '/src/assets/icons/bolt-solid-full.svg',
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
    'Housing': 'housing-icon',
    'Travel': 'travel-icon',
    'Healthcare': 'healthcare-icon',
    'Utilities': 'utilities-icon',
    'Salary': 'salary-icon',
    'Other': 'other-icon'
  };
  return styles[category] || 'other-icon';
};
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
  font: Poppins, sans-serif;
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
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  padding: 20px;
  min-width: 160px;
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
  font-size: 12px;
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
  background: rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.stat-trend img {
  width: 16px;
  height: 16px;
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
  font-family: Poppins, sans-serif;
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
  /* Prevent icon from shrinking */
}

/* SVG icon styling */
.category-svg {
  width: 20px;
  height: 20px;
  filter: brightness(0) invert(1);
  /* Make SVG white */
}

/* Category-specific icon colors */
.food-icon {
  background: #ff9800;
}

.transport-icon {
  background: #2196f3;
}

.shopping-icon {
  background: #e91e63;
}

.education-icon {
  background: #9c27b0;
}

.housing-icon {
  background: #795548;
}

.entertainment-icon {
  background: #ff5722;
}

.healthcare-icon {
  background: #f44336;
}

.utilities-icon {
  background: #ffeb3b;
}

.utilities-icon .category-svg {
  filter: brightness(0);
  /* Make utilities icon black instead of white */
}

.salary-icon {
  background: var(--color-charts);
}

.freelance-icon {
  background: #607d8b;
}

.investment-icon {
  background: #4caf50;
}

.other-icon {
  background: #9e9e9e;
}

/* Transaction details styling */
.transaction-details {
  flex: 1;
  min-width: 0;
  /* Allow text to wrap */
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

/* Transaction amount styling */
.transaction-amount {
  font-size: 14px;
  font-weight: 600;
  white-space: nowrap;
  text-align: right;
}

.income-amount {
  color: var(--color-charts);
}

.expense-amount {
  color: #f44336;
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


/* .transaction-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
}

.income-icon {
  background: var(--color-charts);
  color: white;
}

.food-icon {
  background: #ff9800;
  color: white;
}

.education-icon {
  background: #9c27b0;
  color: white;
}

.transaction-details {
  flex: 1;
}

.transaction-name {
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text);
  margin: 0 0 4px 0;
}

.transaction-date {
  font-size: 12px;
  color: #666;
  margin: 0;
}

.transaction-amount {
  font-size: 14px;
  font-weight: 600;
}

.income-amount {
  color: var(--color-charts);
}

.expense-amount {
  color: #f44336;
} */
</style>