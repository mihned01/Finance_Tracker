<template>
  <div class="expenses-card">
    <h3>Expense Breakdown</h3>
    
    <div class="expense-stats">
      <div class="expense-stat">
        <p class="period">This Month</p>
        <p class="amount">DK {{ currentMonthExpenses.toFixed(2) }}</p>
      </div>
      <div class="expense-stat">
        <p class="period">Last Month</p>
        <p class="amount">DK {{ lastMonthExpenses.toFixed(2) }}</p>
      </div>
    </div>

    <div class="chart-container">
      <div class="donut-chart" :style="{ background: donutGradient }">
        <div class="chart-center">
          <span class="total-label">Total</span>
          <span class="total-amount">DK {{ totalExpenses.toFixed(0) }}</span>
        </div>
      </div>
      
      <div class="chart-legend">
        <div v-for="category in categoryData" :key="category.name" class="legend-item">
          <div class="legend-color" :style="{ background: category.color }"></div>
          <span class="legend-name">{{ category.name }}</span>
          <span class="legend-amount">DK {{ category.amount.toFixed(0) }}</span>
        </div>
        <div v-if="categoryData.length === 0" class="no-data">
          <p>No expense data available</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  transactions: {
    type: Array,
    default: () => []
  }
})

const colors = [
  'var(--color-charts-three)',     // Red
  'var(--color-charts-secondary)', // Green  
  'var(--color-charts)',           // Blue
  '#f39c12',                       // Orange
  '#9b59b6',                       // Purple
  '#34495e',                       // Dark gray
  '#95a5a6'                        // Light gray
]

const expenseTransactions = computed(() => {
  return props.transactions.filter(t => t.type === 'expense')
})

const totalExpenses = computed(() => {
  return expenseTransactions.value.reduce((sum, t) => sum + Math.abs(t.amount), 0)
})

const currentMonthExpenses = computed(() => {
  const currentMonth = new Date().getMonth()
  const currentYear = new Date().getFullYear()
  
  return expenseTransactions.value
    .filter(t => {
      const date = new Date(t.date)
      return date.getMonth() === currentMonth && date.getFullYear() === currentYear
    })
    .reduce((sum, t) => sum + Math.abs(t.amount), 0)
})

const lastMonthExpenses = computed(() => {
  const lastMonth = new Date().getMonth() - 1
  const year = lastMonth < 0 ? new Date().getFullYear() - 1 : new Date().getFullYear()
  const month = lastMonth < 0 ? 11 : lastMonth
  
  return expenseTransactions.value
    .filter(t => {
      const date = new Date(t.date)
      return date.getMonth() === month && date.getFullYear() === year
    })
    .reduce((sum, t) => sum + Math.abs(t.amount), 0)
})

const categoryData = computed(() => {
  const categoryTotals = {}
  
  expenseTransactions.value.forEach(transaction => {
    const category = transaction.category || 'Other'
    categoryTotals[category] = (categoryTotals[category] || 0) + Math.abs(transaction.amount)
  })
  
  return Object.entries(categoryTotals)
    .map(([name, amount], index) => ({
      name,
      amount,
      color: colors[index % colors.length],
      percentage: totalExpenses.value > 0 ? (amount / totalExpenses.value) * 100 : 0
    }))
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 6) // Show top 6 categories
})

const donutGradient = computed(() => {
  if (categoryData.value.length === 0) {
    return 'conic-gradient(#e0e0e0 0deg 360deg)'
  }
  
  let gradientStops = []
  let currentAngle = 0
  
  categoryData.value.forEach(category => {
    const angle = (category.percentage / 100) * 360
    gradientStops.push(`${category.color} ${currentAngle}deg ${currentAngle + angle}deg`)
    currentAngle += angle
  })
  
  // Fill remaining with gray if needed
  if (currentAngle < 360) {
    gradientStops.push(`#e0e0e0 ${currentAngle}deg 360deg`)
  }
  
  return `conic-gradient(${gradientStops.join(', ')})`
})
</script>

<style scoped>
.expenses-card {
  background: var(--color-background);
  border: 1px solid #e0e0e0;
  border-radius: 16px;
  padding: 25px;
}

.expenses-card h3 {
  font-family: 'Poppins', sans-serif;
  font-size: 18px;
  font-weight: 600;
  color: var(--color-text);
  margin: 0 0 20px 0;
}

.expense-stats {
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
  gap: 10px;
}

.expense-stat {
  text-align: center;
  flex: 1;
  padding: 15px 10px;
  background: #f8f9fa;
  border-radius: 8px;
}

.expense-stat .period {
  font-size: 12px;
  color: #666;
  margin: 0 0 4px 0;
  font-family: 'Poppins', sans-serif;
}

.expense-stat .amount {
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text);
  margin: 0;
  font-family: 'Poppins', sans-serif;
}

.chart-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.donut-chart {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.chart-center {
  width: 60px;
  height: 60px;
  background: var(--color-background);
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 0 2px white;
}

.total-label {
  font-size: 10px;
  color: #666;
  font-family: 'Poppins', sans-serif;
}

.total-amount {
  font-size: 12px;
  font-weight: 600;
  color: var(--color-text);
  font-family: 'Poppins', sans-serif;
}

.chart-legend {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  font-family: 'Poppins', sans-serif;
  padding: 4px 0;
}

.legend-color {
  width: 12px;
  height: 12px;
  border-radius: 2px;
  flex-shrink: 0;
}

.legend-name {
  flex: 1;
  color: var(--color-text);
}

.legend-amount {
  color: #666;
  font-weight: 500;
}

.no-data {
  text-align: center;
  color: #666;
  font-style: italic;
  padding: 20px;
}

.no-data p {
  margin: 0;
  font-family: 'Poppins', sans-serif;
}
</style>