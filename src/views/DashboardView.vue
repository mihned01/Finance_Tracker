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
          <img src="@/assets/icons/arrow-right-from-bracket-solid-full.svg" alt="Profile">
          Log out
        </button>
      </div>
    </div>

    <div class="main-content">
      <div class="main-content-container">
        <!-- Header Section -->

        <div class="dashboard-header">

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
              <div class="stat-trend">
                <img src="@/assets/icons/arrow-trend-down-solid-full.svg" alt="trend">
              </div>
            </div>

            <div class="stat-card income">
              <p class="stat-label">Income</p>
              <p class="stat-number">DK {{ totalIncome.toFixed(2) }}</p>
              <div class="stat-trend">
                <img src="@/assets/icons/arrow-trend-up-solid-full.svg" alt="trend">
              </div>
            </div>
          </div>
        </div>

        <!-- Main Content Area -->
        <div class="dashboard-statistics">


          <div class="content-grid">
            <!-- Charts Container -->
            <div class="charts-container">

              <div class="charts-left">
                <!-- Donut Chart -->
                <DonutChart :transactions="transactions" />
              </div>


              <div class="charts-right">

                <!-- Side Statistics -->
                <div class="side-stats">
                  <!-- Quick Stats Card -->
                  <div class="stats-card">
                    <h3>Quick Overview</h3>
                    <div class="quick-stats">
                      <div class="quick-stat">
                        <div class="stat-icon expense-icon">
                          <img src="@/assets/icons/arrow-trend-down-solid-full.svg" alt="trend">
                        </div>
                        <div class="stat-info">
                          <div class="stat-title">Largest Expense</div>
                          <div class="stat-amount">DK {{ largestExpense.toFixed(2) }}</div>
                        </div>
                      </div>
                      <div class="quick-stat">
                        <div class="stat-icon income-icon">
                          <img src="@/assets/icons/arrow-trend-up-solid-full.svg" alt="trend">
                        </div>
                        <div class="stat-info">
                          <div class="stat-title">Largest Income</div>
                          <div class="stat-amount">DK {{ largestIncome.toFixed(2) }}</div>
                        </div>
                      </div>
                      <div class="quick-stat">
                        <div class="stat-icon average-icon">
                          <img src="@/assets/icons/chart-simple-solid-full.svg" alt="trend">
                        </div>
                        <div class="stat-info">
                          <div class="stat-title">Average Transaction</div>
                          <div class="stat-amount">DK {{ averageTransaction.toFixed(2) }}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Savings Goal -->
                  <div class="stats-card savings-card">
                    <h3>Monthly Budget</h3>
                    <div class="savings-progress">
                      <div class="progress-circle">
                        <div class="progress-value">68%</div>
                      </div>
                      <div class="progress-info">
                        <div class="progress-text">
                          <span class="spent">DK {{ totalExpenses.toFixed(0) }} spent</span>
                          <span class="budget">of DK 2,500 budget</span>
                        </div>
                        <div class="remaining">
                          <span class="remaining-amount">DK {{ (2500 - totalExpenses).toFixed(0) }} remaining</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

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
import DonutChart from '@/components/charts/donutChart.vue'

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
  balance
} = useTransactions()

const handleLogout = async () => {
  await logout()
  router.push('/')
}

// Additional computed statistics
const averageTransaction = computed(() => {
  if (transactions.value.length === 0) return 0
  const total = transactions.value.reduce((sum, t) => sum + Math.abs(t.amount), 0)
  return total / transactions.value.length
})

const largestExpense = computed(() => {
  const expenses = transactions.value.filter(t => t.type === 'expense')
  if (expenses.length === 0) return 0
  return Math.max(...expenses.map(t => t.amount))
})

const largestIncome = computed(() => {
  const income = transactions.value.filter(t => t.type === 'income')
  if (income.length === 0) return 0
  return Math.max(...income.map(t => t.amount))
})


const setTransactionType = (type) => {
  newTransaction.value.type = type
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
  width: 60px;
  height: 60px;
  padding: 15px;
  border-radius: 50%;
  background: #f6f6f6;
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

.dashboard-header {
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

.dashboard-statistics {
  width: 100%;
  gap: 20px;
}

.charts-container {
  display: flex;
  gap: 20px;
  width: 100%;
}

.charts-left {
  width: 60%;
  ;
}

.charts-right {
  width: 40%;
  ;
}

/* Side Statistics Styles */
.side-stats {
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: 100%;
}

.stats-card {
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  transition: box-shadow 0.3s ease;
}

.stats-card:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
}

.stats-card h3 {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin: 0 0 20px 0;
  font-family: 'Poppins', sans-serif;
}

.quick-stats {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.quick-stat {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: #f8f9fa;
  border-radius: 8px;
  transition: background-color 0.3s ease;
}

.quick-stat:hover {
  background: #e9ecef;
}

.stat-icon {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  flex-shrink: 0;
}

.stat-icon img {
  width: 20px;
  height: 20px;
  filter: brightness(0) saturate(100%) invert(100%);
}

.expense-icon {
  background: var(--color-charts-three);
}

.income-icon {
  background: var(--color-charts-secondary);
}

.average-icon {
  background: var(--color-charts);
}

.stat-info {
  flex: 1;
}

.stat-title {
  font-size: 12px;
  color: #666;
  margin-bottom: 2px;
  font-family: 'Poppins', sans-serif;
}

.stat-amount {
  font-size: 14px;
  font-weight: 600;
  color: #333;
  font-family: 'Poppins', sans-serif;
}

/* Savings Card */
.savings-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
}

.savings-card h3 {
  color: white;
}

.savings-progress {
  display: flex;
  align-items: center;
  gap: 20px;
}

.progress-circle {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: conic-gradient(white 0deg 245deg, rgba(255, 255, 255, 0.3) 245deg 360deg);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  flex-shrink: 0;
}

.progress-circle::after {
  content: '';
  position: absolute;
  width: 60px;
  height: 60px;
  background: inherit;
  border-radius: 50%;
}

.progress-value {
  position: relative;
  z-index: 1;
  font-size: 16px;
  font-weight: 600;
  font-family: 'Poppins', sans-serif;
}

.progress-info {
  flex: 1;
}

.progress-text {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 8px;
}

.spent {
  font-size: 14px;
  font-weight: 600;
  font-family: 'Poppins', sans-serif;
}

.budget {
  font-size: 12px;
  opacity: 0.8;
  font-family: 'Poppins', sans-serif;
}

.remaining-amount {
  font-size: 12px;
  opacity: 0.9;
  font-family: 'Poppins', sans-serif;
}
</style>