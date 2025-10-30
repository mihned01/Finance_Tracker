<template>
  <div class="dashboard-container">
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
        <div class="statistics-header">
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
        <div class="content-grid">
          <!-- Charts Container -->
          <div class="charts-container">
            <!-- Monthly Expenses Chart -->
            <div class="chart-card main-chart">
              <div class="chart-header">
                <h3>Monthly Expense Analysis</h3>
                <div class="chart-controls">
                  <div class="chart-period">Last 6 months (including current)</div>
                </div>
              </div>

              <div class="chart-wrapper">
                <div class="simple-chart">
                  <div class="chart-bars">
                    <div class="chart-bar" v-for="(month, index) in chartData" :key="index">
                      <div class="bar-column">
                        <div class="bar-fill" :class="{ 'current-month-bar': month.isCurrent }"
                          :style="{ height: `${(month.amount / maxAmount) * 100}%` }"></div>
                      </div>
                      <div class="bar-label" :class="{ 'current-label': month.isCurrent }">
                        {{ month.name }}
                      </div>
                      <div class="bar-amount" :class="{ 'current-amount': month.isCurrent }">
                        {{ month.amount }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="chart-summary">
                <div class="summary-stat">
                  <span class="summary-label">Average Monthly</span>
                  <span class="summary-value">DK {{ realStats.average }}</span>
                </div>
                <div class="summary-stat">
                  <span class="summary-label">Highest Month</span>
                  <span class="summary-value">DK {{ realStats.highest }}</span>
                </div>
                <div class="summary-stat">
                  <span class="summary-label">Trend</span>
                  <span class="summary-value" :class="realStats.trendPercent >= 0 ? 'trend-up' : 'trend-down'">
                    {{ realStats.trendPercent >= 0 ? '↗' : '↘' }} {{ Math.abs(realStats.trendPercent) }}%
                  </span>
                </div>
              </div>
            </div>
            <DonutChart :transactions="transactions" />


          </div>

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

            <!-- Monthly Comparison -->
            <div class="stats-card">
              <h3>Monthly Comparison</h3>
              <div class="comparison-chart">
                <!-- This Month Bar -->
                <div class="comparison-bar">
                  <div class="bar-label">This Month</div>
                  <div class="bar-container">
                    <div class="bar current-month"
                      :style="{ width: `${(currentMonthExpenses / comparisonMaxValue) * 100}%` }"></div>
                  </div>
                  <div class="bar-value">DK {{ Math.round(currentMonthExpenses) }}</div>
                </div>

                <!-- Last Month Bar -->
                <div class="comparison-bar">
                  <div class="bar-label">Last Month</div>
                  <div class="bar-container">
                    <div class="bar last-month"
                      :style="{ width: `${(lastMonthExpenses / comparisonMaxValue) * 100}%` }"></div>
                  </div>
                  <div class="bar-value">DK {{ Math.round(lastMonthExpenses) }}</div>
                </div>

                <!-- 6 Month Average Bar -->
                <div class="comparison-bar">
                  <div class="bar-label">Avg. 6 Months</div>
                  <div class="bar-container">
                    <div class="bar average-month"
                      :style="{ width: `${(sixMonthAverage / comparisonMaxValue) * 100}%` }"></div>
                  </div>
                  <div class="bar-value">DK {{ Math.round(sixMonthAverage) }}</div>
                </div>
              </div>

              <!-- Comparison insights -->
              <div class="comparison-insights">
                <div class="insight-item">
                  <span class="insight-label">vs Last Month:</span>
                  <span class="insight-value"
                    :class="currentMonthExpenses >= lastMonthExpenses ? 'increase' : 'decrease'">
                    {{ lastMonthExpenses > 0 ?
                      (((currentMonthExpenses - lastMonthExpenses) / lastMonthExpenses) * 100).toFixed(0) : 0 }}%
                    {{ currentMonthExpenses >= lastMonthExpenses ? '↗' : '↘' }}
                  </span>
                </div>
                <div class="insight-item">
                  <span class="insight-label">vs Average:</span>
                  <span class="insight-value"
                    :class="currentMonthExpenses >= sixMonthAverage ? 'increase' : 'decrease'">
                    {{ sixMonthAverage > 0 ?
                      (((currentMonthExpenses - sixMonthAverage) / sixMonthAverage) * 100).toFixed(0) : 0 }}%
                    {{ currentMonthExpenses >= sixMonthAverage ? '↗' : '↘' }}
                  </span>
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
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/modules/useAuth'
import { useTransactions } from '@/modules/useTransactions'
import DonutChart from '@/components/charts/donutChart.vue'

const router = useRouter()
const { currentUser, logout } = useAuth()
const { transactions, totalExpenses, totalIncome, balance } = useTransactions()

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

// New computed property for chart data
const chartData = computed(() => {
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const currentDate = new Date()
  const currentMonth = currentDate.getMonth() // 0-11 (October = 9)
  const currentYear = currentDate.getFullYear()

  // Create array for 6 months: 5 previous months + current month
  const monthsData = []

  for (let i = 5; i >= 0; i--) {
    // Calculate month index going backwards from current month
    const monthIndex = (currentMonth - i + 12) % 12
    const year = currentMonth - i < 0 ? currentYear - 1 : currentYear

    // Create the month key for filtering transactions
    const monthKey = `${year}-${String(monthIndex + 1).padStart(2, '0')}`

    console.log(`Processing month: ${monthNames[monthIndex]} ${year} (key: ${monthKey})`)

    // Find expenses for this specific month
    const monthExpenses = transactions.value
      .filter(transaction => {
        if (transaction.type !== 'expense') return false

        // Handle both Firebase timestamps and regular dates
        let transactionDate
        if (transaction.createdAt?.toDate) {
          transactionDate = transaction.createdAt.toDate()
        } else if (transaction.createdAt) {
          transactionDate = new Date(transaction.createdAt)
        } else {
          console.log('Transaction has no date:', transaction)
          return false
        }

        const transactionMonthKey = `${transactionDate.getFullYear()}-${String(transactionDate.getMonth() + 1).padStart(2, '0')}`
        console.log(`Transaction date: ${transactionDate.toDateString()}, key: ${transactionMonthKey}`)

        return transactionMonthKey === monthKey
      })
      .reduce((sum, transaction) => sum + transaction.amount, 0)

    console.log(`${monthNames[monthIndex]} ${year}: DK ${monthExpenses}`)

    monthsData.push({
      name: monthNames[monthIndex],
      amount: Math.round(monthExpenses),
      fullDate: `${monthNames[monthIndex]} ${year}`,
      isCurrent: i === 0 // Mark if this is the current month
    })
  }

  return monthsData
})

// Calculate the highest amount for scaling
const maxAmount = computed(() => {
  const amounts = chartData.value.map(month => month.amount)
  return Math.max(...amounts, 100) // Minimum 100 for better visualization
})

// Get current month expenses (real data)
const currentMonthExpenses = computed(() => {
  const currentDate = new Date()
  const currentMonthKey = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}`

  return transactions.value
    .filter(transaction => {
      if (transaction.type !== 'expense') return false

      let transactionDate
      if (transaction.createdAt?.toDate) {
        transactionDate = transaction.createdAt.toDate()
      } else if (transaction.createdAt) {
        transactionDate = new Date(transaction.createdAt)
      } else {
        return false
      }

      const transactionMonthKey = `${transactionDate.getFullYear()}-${String(transactionDate.getMonth() + 1).padStart(2, '0')}`
      return transactionMonthKey === currentMonthKey
    })
    .reduce((sum, transaction) => sum + transaction.amount, 0)
})

// Get last month expenses (real data)
const lastMonthExpenses = computed(() => {
  const lastMonthDate = new Date()
  lastMonthDate.setMonth(lastMonthDate.getMonth() - 1)
  const lastMonthKey = `${lastMonthDate.getFullYear()}-${String(lastMonthDate.getMonth() + 1).padStart(2, '0')}`

  return transactions.value
    .filter(transaction => {
      if (transaction.type !== 'expense') return false

      let transactionDate
      if (transaction.createdAt?.toDate) {
        transactionDate = transaction.createdAt.toDate()
      } else if (transaction.createdAt) {
        transactionDate = new Date(transaction.createdAt)
      } else {
        return false
      }

      const transactionMonthKey = `${transactionDate.getFullYear()}-${String(transactionDate.getMonth() + 1).padStart(2, '0')}`
      return transactionMonthKey === lastMonthKey
    })
    .reduce((sum, transaction) => sum + transaction.amount, 0)
})

// Get average of last 6 months (real data)
const sixMonthAverage = computed(() => {
  const amounts = chartData.value.map(month => month.amount)
  const total = amounts.reduce((sum, amount) => sum + amount, 0)
  return amounts.length > 0 ? total / amounts.length : 0
})

// Calculate the maximum value for bar width scaling
const comparisonMaxValue = computed(() => {
  return Math.max(
    currentMonthExpenses.value,
    lastMonthExpenses.value,
    sixMonthAverage.value,
    100 // Minimum value for better visualization
  )
})


// Real statistics based on actual data
const realStats = computed(() => {
  const amounts = chartData.value.map(month => month.amount)
  const total = amounts.reduce((sum, amount) => sum + amount, 0)
  const average = amounts.length > 0 ? Math.round(total / amounts.length) : 0
  const highest = Math.max(...amounts)

  // Calculate trend (last month vs previous months)
  const lastMonth = amounts[amounts.length - 1] || 0
  const previousAverage = amounts.length > 1
    ? amounts.slice(0, -1).reduce((sum, amt) => sum + amt, 0) / (amounts.length - 1)
    : 0

  const trendPercent = previousAverage > 0
    ? Math.round((lastMonth - previousAverage) / previousAverage * 100)
    : 0

  return { average, highest, trendPercent }
})

const handleLogout = async () => {
  await logout()
  router.push('/')
}
</script>

<style scoped>
/* Your existing base styles... */
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


/* Chart Specific Styles */
.content-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 20px;
  height: calc(100% - 120px);
  margin: 30px 0;
}

.charts-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.chart-card {
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 16px;
  padding: 25px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  transition: box-shadow 0.3s ease;
}

.chart-card:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
}

.chart-card.main-chart {
  height: fit-content;
}

.main-chart {
  flex: 2;
  height: fit-content;
}

.category-chart {
  flex: 1;
  min-height: 350px;
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #f0f0f0;
}

.chart-header h3 {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  font-family: 'Poppins', sans-serif;
  margin: 0;
}

.chart-controls {
  display: flex;
  gap: 10px;
  align-items: center;
}

.time-filter {
  padding: 8px 12px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 13px;
  background: white;
  color: #666;
  cursor: pointer;
  transition: border-color 0.3s ease;
}

.time-filter:hover {
  border-color: var(--color-charts-secondary);
}

.chart-period {
  padding: 6px 12px;
  background: var(--color-charts-secondary);
  color: white;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
}

.chart-wrapper {
  height: 250px;
  margin: 20px 0;
  position: relative;
}

.chart-summary {
  display: flex;
  justify-content: space-around;
  padding: 20px 0;
  border-top: 1px solid #f0f0f0;
  margin-top: 20px;
}

.summary-stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.summary-label {
  font-size: 12px;
  color: #666;
  font-weight: 500;
}

.summary-value {
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

.trend-up {
  color: var(--color-charts-secondary) !important;
}

/* Donut Chart Styles */
.donut-chart-container {
  display: flex;
  justify-content: center;
  margin: 30px 0;
}

.donut-chart {
  width: 160px;
  height: 160px;
  border-radius: 50%;
  background: conic-gradient(var(--color-charts-secondary) 0deg 126deg,
      var(--color-charts-three) 126deg 205deg,
      var(--color-charts) 205deg 302deg,
      #e8f4fd 302deg 360deg);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.donut-center {
  width: 100px;
  height: 100px;
  background: white;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.center-label {
  font-size: 12px;
  color: #666;
  margin-bottom: 4px;
}

.center-value {
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

.chart-legend {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 0;
}

.legend-color {
  width: 16px;
  height: 16px;
  border-radius: 4px;
  flex-shrink: 0;
}

.legend-color.food {
  background: var(--color-charts-secondary);
}

.legend-color.transport {
  background: var(--color-charts-three);
}

.legend-color.housing {
  background: var(--color-charts);
}

.legend-color.shopping {
  background: #e8f4fd;
}

.legend-label {
  flex: 1;
  font-size: 14px;
  color: #333;
  font-weight: 500;
}

.legend-value {
  font-size: 14px;
  color: #666;
  font-weight: 500;
  min-width: 70px;
  text-align: right;
}

.legend-percent {
  font-size: 12px;
  color: #999;
  min-width: 35px;
  text-align: right;
}

/* Side Statistics */
.side-stats {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.stats-card {
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
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
}

.stat-amount {
  font-size: 14px;
  font-weight: 600;
  color: #333;
}

/* Comparison Chart */
.comparison-chart {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.comparison-insights {
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid #f0f0f0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.insight-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
}

.insight-label {
  color: #666;
  font-weight: 500;
}

.insight-value {
  font-weight: 600;
  font-size: 11px;
}

.insight-value.increase {
  color: var(--color-charts-three);
}

.insight-value.decrease {
  color: var(--color-charts-secondary);
}

.current-month {
  background: var(--color-charts-secondary);
  animation: growBar 1s ease-out;
}

.last-month {
  background: var(--color-charts-three);
  animation: growBar 1.2s ease-out;
}

.average-month {
  background: var(--color-charts);
  animation: growBar 1.4s ease-out;
}

@keyframes growBar {
  from {
    width: 0%;
  }

  to {
    width: var(--final-width);
  }
}

.bar-container {
  flex: 1;
  height: 10px;
  background: #f0f0f0;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
}

.comparison-bar {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
}

.bar-label {
  font-size: 12px;
  color: #666;
  min-width: 85px;
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
}

.bar-value {
  font-size: 12px;
  color: #333;
  font-weight: 600;
  min-width: 70px;
  text-align: right;
  font-family: 'Poppins', sans-serif;
}

.bar {
  height: 100%;
  border-radius: 4px;
  transition: width 0.8s ease;
}

.current-month-bar {
  background: var(--color-charts-three) !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.current-label {
  color: var(--color-charts-three);
  font-weight: 600;
}

.current-amount {
  color: var(--color-charts-three);
  font-weight: 700;
}

.last-month {
  background: var(--color-charts-three);
}

.average-month {
  background: var(--color-charts);
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
}

.budget {
  font-size: 12px;
  opacity: 0.8;
}

.remaining-amount {
  font-size: 12px;
  opacity: 0.9;
}


/* Menu styles */
.user-profile,
.menu-items,
.menu-item,
.menu-footer,
.logout {}


.simple-chart {
  width: 100%;
  height: 200px;
  padding: 20px 0;
}

.chart-bars {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  height: 150px;
  gap: 10px;
  padding: 0 20px;
}

.chart-bar {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  max-width: 60px;
}

.bar-column {
  width: 100%;
  height: 120px;
  background: #f0f0f0;
  border-radius: 4px;
  position: relative;
  margin-bottom: 8px;
}

.bar-fill {
  width: 100%;
  background: var(--color-charts-secondary);
  border-radius: 4px;
  position: absolute;
  bottom: 0;
  transition: height 0.8s ease;
  min-height: 2px;
}

.bar-label {
  font-size: 11px;
  color: #666;
  margin-bottom: 4px;
  font-weight: 500;
}

.bar-amount {
  font-size: 10px;
  color: #333;
  font-weight: 600;
}

.trend-down {
  color: var(--color-charts-three) !important;
}
</style>