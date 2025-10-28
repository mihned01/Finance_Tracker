<template>
  <div class="dashboard-container">
    <!-- Side Menu (keep existing) -->
    <div class="side-menu">
      <div class="user-profile">
        <div class="profile-image">
          <img src="@/assets/icons/user-solid.svg" alt="Profile">
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
          <img src="@/assets/icons/arrow-right-from-bracket-solid-full.svg" alt="Logout">
          Log out
        </button>
      </div>
    </div>

    <div class="main-content">
      <div class="main-content-container">
        <!-- Header Stats -->
        <div class="categories-header">

          <div class="categories-header">

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


        </div>

        <!-- Category Cards Grid -->
        <div class="categories-content">
          <h2 class="section-title">Categories</h2>

          <div class="categories-grid">
            <!-- All Transactions Card -->
            <div class="category-card all-card" @click="navigateToCategory('all')">
              <div class="card-icon">
                <img src="@/assets/icons/category.svg" alt="All" class="category-svg">
              </div>
              <div class="card-content">
                <h4>All</h4>
                <p>{{ transactions.length }} transactions</p>
              </div>
            </div>

            <!-- Category Cards -->
            <div v-for="category in categoryStats" :key="category.name" class="category-card"
              :class="getCategoryClass(category.name)" @click="navigateToCategory(category.name)">
              <div class="card-icon">
                <img :src="getCategoryIcon(category.name)" :alt="category.name" class="category-svg">
              </div>
              <div class="card-content">
                <h4>{{ category.displayName }}</h4>
                <p>{{ category.count }} transactions</p>
              </div>
            </div>
          </div>


          <div class="all-transactions-container">

            <h3>All Transactions</h3>

            <!-- Transaction Cards -->
            <div class="transactions-list" v-if="transactions.length > 0">
              <div v-for="transaction in transactions" :key="transaction.id" class="transaction-card">
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

                <!-- Delete Button (Optional) -->
                <button @click="deleteTransaction(transaction.id)" class="delete-btn" title="Delete transaction">
                  <img src="@/assets/icons/trash-can-solid-full.svg" alt="Delete" class="delete-icon">
                </button>
              </div>

            </div>

   <!-- No Transactions Message -->
            <div v-else class="no-transactions">
              <p>No transactions found</p>
            </div>


          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/modules/useAuth'
import { useTransactions } from '@/modules/useTransactions'

const router = useRouter()
const { currentUser, logout } = useAuth()
const { transactions, totalExpenses, totalIncome, balance, deleteTransaction } = useTransactions()

const handleLogout = async () => {
  await logout()
  router.push('/')
}


// Computed properties for category statistics
const categoryStats = computed(() => {
  const categories = [
    { name: 'Rent & Bills', displayName: 'Rent & bills' },
    { name: 'Transport', displayName: 'Transport' },
    { name: 'Healthcare', displayName: 'Health & medicine' },
    { name: 'Shopping', displayName: 'Shopping' },
    { name: 'Travel', displayName: 'Travel' },
    { name: 'Food & Drinks', displayName: 'Food & drinks' },
    { name: 'Education', displayName: 'Education' },
    { name: 'Salary', displayName: 'Income' },
    { name: 'Other', displayName: 'Other' },
  ]

  return categories.map(cat => {
    const categoryTransactions = transactions.value.filter(t => t.category === cat.name)
    const totalAmount = categoryTransactions.reduce((sum, t) => sum + t.amount, 0)

    return {
      ...cat,
      count: categoryTransactions.length,
      amount: totalAmount
    }
  })
})



const expensePercentage = computed(() => 15)
const incomePercentage = computed(() => 5)

// Helper functions
const getCategoryIcon = (category) => {
  const icons = {
    'Rent & Bills': '/src/assets/icons/bolt-solid-full.svg',
    'Transport': '/src/assets/icons/car-solid-full.svg',
    'Healthcare': '/src/assets/icons/capsules-solid-full.svg',
    'Education': '/src/assets/icons/book-open-solid-full.svg',
    'Salary': '/src/assets/icons/chart-line-solid-full.svg',
    'Food & Drinks': '/src/assets/icons/utensils-solid-full.svg',
    'Shopping': '/src/assets/icons/bag-shopping-solid-full.svg',
    'Travel': '/src/assets/icons/plane-solid-full.svg',
    'Other': '/src/assets/icons/category.svg'
  }
  return icons[category] || '/src/assets/icons/category.svg'
}

const getCategoryClass = (category) => {
  const classes = {
    'Rent & Bills': 'housing-card',
    'Transport': 'transport-card',
    'Healthcare': 'healthcare-card',
    'Education': 'education-card',
    'Salary': 'salary-card',
    'Food & Drinks': 'food-card',
    'Shopping': 'shopping-card',
    'Travel': 'travel-card',
    'Other': 'other-card'
  }
  return classes[category] || 'default-card'
}

const getCategoryStyle = (category) => {
  const styles = {
    'Rent & Bills': 'housing-card',
    'Transport': 'transport-card',
    'Healthcare': 'healthcare-card',
    'Education': 'education-card',
    'Salary': 'salary-card',
    'Food & Drinks': 'food-card',
    'Shopping': 'shopping-card',
    'Travel': 'travel-card',
    'Other': 'other-card'
  }
  return styles[category] || 'other-icon'
}

const navigateToCategory = (categoryName) => {
  // You can implement navigation logic here
  console.log('Navigate to category:', categoryName)
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
  font-size: 18px;
  margin-bottom: 0.5rem;
  color: var(--color-text);
}

.user-info p {
  font-size: 14px;
  opacity: 0.8;
  color: var(--color-text);
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

/* Header Stats */
.categories-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 10px;
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

/* Categories Content */
.categories-content {
  margin-top: 10px;
}

.section-title {
  font-size: 24px;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 25px;
  font-family: 'Poppins', sans-serif;
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  /* Very compact */
  gap: 10px;
}

.category-card {
  background: white;
  border-radius: 10px;
  padding: 15px;
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  min-height: 50px;
}

.card-icon {
  width: 30px;
  height: 30px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.category-svg {
  width: 15px;
  height: 15px;
  filter: brightness(0) invert(1);
}

.card-content h4 {
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 2px;
  font-family: 'Poppins', sans-serif;
}

.card-content p {
  font-size: 12px;
  opacity: 0.9;
  margin-bottom: 1px;
}

.category-amount {
  font-size: 12px;
  font-weight: 600;
  margin-top: 2px;
}

@media (min-width: 1400px) {
  .categories-grid {
    grid-template-columns: repeat(5, 1fr);
  }
}

@media (min-width: 1200px) {
  .categories-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

.category-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

/* All Card */
.all-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

/* Category-specific colors */
.housing-card {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  color: white;
}

.transport-card {
  background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
  color: #333;
}

.education-card {
  background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
  color: white;
}

.salary-card {
  background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
  color: white;
}

.food-card {
  background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%);
  color: #333;
}

.healthcare-card {
  background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%);
  color: white;
}

.shopping-card {
  background: linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%);
  color: white;
}

.travel-card {
  background: linear-gradient(135deg, #fad0c4 0%, #ffd1ff 100%);
  color: #333;
}

.utilities-card {
  background: linear-gradient(135deg, #fdbb2d 0%, #22c1c3 100%);
  color: white;
}

.other-card {
  background: linear-gradient(135deg, #9890e3 0%, #b1f4cf 100%);
  color: #333;
}

/* Adjust text color for light backgrounds */
.salary-card .category-svg,
.food-card .category-svg,
.travel-card .category-svg,
.other-card .category-svg {
  filter: brightness(0);
}

.salary-card .card-icon,
.food-card .card-icon,
.travel-card .card-icon,
.other-card .card-icon {
  background: rgba(0, 0, 0, 0.1);
}

@media (max-width: 1200px) {
  .categories-grid {
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  }
}

@media (max-width: 768px) {
  .header-stats {
    grid-template-columns: 1fr;
  }

  .categories-grid {
    grid-template-columns: 1fr;
  }

  .side-menu {
    width: 250px;
  }
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
  filter: brightness(0) invert(1); /* White icons */
}

.transport-icon .category-svg,
.food-icon .category-svg,
.travel-icon .category-svg,
.other-icon .category-svg {
  filter: brightness(0); /* Black icons */
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
  color: var(--color-charts);
}

.expense-amount {
  color: #f44336;
}

/* Delete Button */
.delete-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  transition: background-color 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.delete-btn:hover {
  background-color: #ffebee;
}

.delete-icon {
  width: 16px;
  height: 16px;
  filter: brightness(0) saturate(100%) invert(27%) sepia(98%) saturate(3180%) hue-rotate(346deg) brightness(91%) contrast(91%);
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

/* Responsive Design */
@media (max-width: 768px) {
  .transaction-card {
    padding: 12px;
    gap: 10px;
  }

  .transaction-icon {
    width: 40px;
    height: 40px;
  }

  .transaction-description {
    font-size: 13px;
  }

  .transaction-amount {
    font-size: 13px;
  }
}
</style>