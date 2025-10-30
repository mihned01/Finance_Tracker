<template>
  <div class="money-flow-chart">
    <div class="chart-header">
      <h3>Monthly Spending Trend</h3>
      <select class="time-filter" v-model="selectedPeriod">
        <option value="6">Last 6 months</option>
        <option value="12">Last 12 months</option>
        <option value="year">This year</option>
      </select>
    </div>
    <div class="chart-area">
      <div class="chart-container">
        <div class="chart-bars">
          <div v-for="month in monthlyData" :key="month.name" class="chart-bar-group">
            <div class="bar-container">
              <div 
                class="income-bar" 
                :style="{ height: getBarHeight(month.income) + '%' }"
                :title="`Income: DK ${month.income.toFixed(2)}`"
              ></div>
              <div 
                class="expense-bar" 
                :style="{ height: getBarHeight(month.expenses) + '%' }"
                :title="`Expenses: DK ${month.expenses.toFixed(2)}`"
              ></div>
            </div>
            <span class="month-label">{{ month.name }}</span>
          </div>
        </div>
        <div class="chart-legend">
          <div class="legend-item">
            <div class="legend-color income"></div>
            <span>Income</span>
          </div>
          <div class="legend-item">
            <div class="legend-color expense"></div>
            <span>Expenses</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  transactions: {
    type: Array,
    default: () => []
  }
})

const selectedPeriod = ref('6')

const monthlyData = computed(() => {
  const months = []
  const currentDate = new Date()
  const monthCount = selectedPeriod.value === 'year' ? 12 : parseInt(selectedPeriod.value)
  
  for (let i = monthCount - 1; i >= 0; i--) {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1)
    const monthName = date.toLocaleDateString('en-GB', { month: 'short' })
    
    const monthTransactions = props.transactions.filter(transaction => {
      const transactionDate = new Date(transaction.date)
      return transactionDate.getMonth() === date.getMonth() && 
             transactionDate.getFullYear() === date.getFullYear()
    })
    
    const income = monthTransactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + Math.abs(t.amount), 0)
    
    const expenses = monthTransactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + Math.abs(t.amount), 0)
    
    months.push({
      name: monthName,
      income,
      expenses
    })
  }
  
  return months
})

const maxAmount = computed(() => {
  const amounts = monthlyData.value.flatMap(month => [month.income, month.expenses])
  return Math.max(...amounts, 1000) // Minimum 1000 for scale
})

const getBarHeight = (amount) => {
  return Math.max((amount / maxAmount.value) * 100, 2) // Minimum 2% height for visibility
}
</script>

<style scoped>
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
  font-family: 'Poppins', sans-serif;
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
  font-family: 'Poppins', sans-serif;
}

.chart-area {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 20px;
  height: 280px;
}

.chart-container {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.chart-bars {
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
  height: 200px;
  gap: 10px;
  flex: 1;
  padding-bottom: 10px;
}

.chart-bar-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  flex: 1;
  max-width: 50px;
}

.bar-container {
  display: flex;
  gap: 4px;
  height: 180px;
  align-items: flex-end;
  justify-content: center;
}

.income-bar {
  background: var(--color-charts-secondary);
  width: 12px;
  border-radius: 2px 2px 0 0;
  transition: height 0.3s ease;
  cursor: pointer;
}

.expense-bar {
  background: var(--color-charts-three);
  width: 12px;
  border-radius: 2px 2px 0 0;
  transition: height 0.3s ease;
  cursor: pointer;
}

.month-label {
  font-size: 11px;
  color: #666;
  font-family: 'Poppins', sans-serif;
  text-align: center;
}

.chart-legend {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 15px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  font-family: 'Poppins', sans-serif;
}

.legend-color {
  width: 12px;
  height: 12px;
  border-radius: 2px;
}

.legend-color.income {
  background: var(--color-charts-secondary);
}

.legend-color.expense {
  background: var(--color-charts-three);
}
</style>