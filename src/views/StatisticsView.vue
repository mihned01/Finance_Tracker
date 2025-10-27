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
              <p class="stat-number"></p>
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

          <!-- Money Flow Chart -->
          <div class="money-flow-chart">
            <div class="chart-header">
              <h3>Money Flow</h3>
              <div class="chart-controls">
                <select class="time-filter">
                  <option>6 Month</option>
                  <option>3 Month</option>
                  <option>1 Year</option>
                </select>
              </div>
            </div>
            <div class="chart-placeholder">
              <!-- Chart will go here -->
              <div class="chart-area"></div>
            </div>
          </div>
          
          <div class="expenses-card">
            <h3>All Expenses</h3>
            <div class="time-selector">
              <select>
                <option>1 Month</option>
                <option>3 Months</option>
                <option>6 Months</option>
              </select>
            </div>

            <div class="expense-stats">
              <div class="expense-stat">
                <p class="period">Daily</p>
                <p class="amount">DK 112</p>
              </div>
              <div class="expense-stat">
                <p class="period">Weekly</p>
                <p class="amount">DK 789</p>
              </div>
              <div class="expense-stat">
                <p class="period">Monthly</p>
                <p class="amount">DK 6 572</p>
              </div>
            </div>

            <div class="expense-chart">
              <!-- Donut chart placeholder -->
              <div class="donut-chart"></div>
              <div class="chart-legend">
                <div class="legend-item">
                  <span class="legend-color housing"></span>
                  <span>Rent/Housing</span>
                </div>
                <div class="legend-item">
                  <span class="legend-color food"></span>
                  <span>Food & Drinks</span>
                </div>
                <div class="legend-item">
                  <span class="legend-color transport"></span>
                  <span>Transport</span>
                </div>
                <div class="legend-item">
                  <span class="legend-color shopping"></span>
                  <span>Shopping</span>
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
  totalExpenses,      // Change from getTotalExpenses
  totalIncome,        // Change from getTotalIncome
  balance             // Change from getBalance
} = useTransactions()

const handleLogout = async () => {
  await logout()
  router.push('/')
}

const setTransactionType = (type) => {
  newTransaction.value.type = type
}
</script>



<style scoped>
.dashboard-container {
  display: flex;
  background-color: var(--color-main);
  height: 100vh;
  overflow: hidden;
}

.side-menu {
  flex: 0 0 20%; /* Don't grow, don't shrink, 20% width */
  min-width: 250px;
  background-color: var(--color-main);
  padding: 40px 0 40px 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow-y: auto; /* Allow sidebar to scroll if content is too long */
}

.main-content {
  flex: 1; /* Take remaining space */
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

/* Header cards */

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
  grid-template-columns: 2fr 1fr;
  gap: 30px;
  margin-bottom: 30px;
}


/* Money Flow Chart */
.money-flow-chart {
  background: var(--color-background);
  width: 100%;
  border: 1px solid #e0e0e0;
  border-radius: 16px;
  padding: 25px;
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.chart-header h3 {
  font-size: 18px;
  font-family: Poppins, sans-serif;
  font-weight: 600;
  color: var(--color-text);
  margin: 0;
}

.time-filter {
  padding: 8px 12px;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  font-size: 12px;
  background: var(--color-background);
}

.chart-area {
  height: 200px;
  background: linear-gradient(135deg, #e0f2fe 0%, #b3e5fc 100%);
  border-radius: 12px;
  position: relative;
}


/* Expenses Card */
.expenses-card {
  background: var(--color-background);
  border: 1px solid #e0e0e0;
  border-radius: 16px;
  padding: 25px;
}

.expenses-card h3 {
  font-family: Poppins, sans-serif;
  font-size: 18px;
  font-weight: 600;
  color: var(--color-text);
  margin: 0 0 20px 0;
}

.expense-stats {
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
}

.expense-stat {
  text-align: center;
}

.expense-stat .period {
  font-size: 12px;
  color: #666;
  margin: 0 0 4px 0;
}

.expense-stat .amount {
  font-size: 16px;
  font-weight: 600;
  color: var(--color-text);
  margin: 0;
}

.donut-chart {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: conic-gradient(var(--color-charts) 0deg 120deg,
      var(--color-charts-secondary) 120deg 200deg,
      var(--color-charts-three) 200deg 280deg,
      #e0e0e0 280deg 360deg);
  margin: 20px auto;
  position: relative;
}

.donut-chart::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60px;
  height: 60px;
  background: var(--color-background);
  border-radius: 50%;
}

.chart-legend {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
}

.legend-color {
  width: 12px;
  height: 12px;
  border-radius: 2px;
}

.legend-color.housing {
  background: var(--color-charts);
}

.legend-color.food {
  background: var(--color-charts-secondary);
}

.legend-color.transport {
  background: var(--color-charts-three);
}

.legend-color.shopping {
  background: #e0e0e0;
}

</style>