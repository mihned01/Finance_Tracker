<template>
    <div class="balance-overview">
      <h3>Balance Overview</h3>
      <div class="balance-chart">
        <div class="balance-display">
          <div class="current-balance">
            <p class="balance-label">Current Balance</p>
            <p class="balance-amount" :class="balance >= 0 ? 'positive' : 'negative'">
              DK {{ balance.toFixed(2) }}
            </p>
          </div>
          <div class="balance-breakdown">
            <div class="breakdown-item income">
              <span class="breakdown-label">Income</span>
              <span class="breakdown-amount">+DK {{ totalIncome.toFixed(2) }}</span>
            </div>
            <div class="breakdown-item expense">
              <span class="breakdown-label">Expenses</span>
              <span class="breakdown-amount">-DK {{ totalExpenses.toFixed(2) }}</span>
            </div>
          </div>
        </div>
        <div class="simple-chart">
          <div class="chart-bar">
            <div class="income-bar" :style="{ width: incomePercentage + '%' }"></div>
            <div class="expense-bar" :style="{ width: expensePercentage + '%' }"></div>
          </div>
          <div class="chart-labels">
            <span class="chart-label income">{{ incomePercentage.toFixed(0) }}%</span>
            <span class="chart-label expense">{{ expensePercentage.toFixed(0) }}%</span>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue'
  
  const props = defineProps({
    totalIncome: {
      type: Number,
      default: 0
    },
    totalExpenses: {
      type: Number,
      default: 0
    },
    balance: {
      type: Number,
      default: 0
    }
  })
  
  const incomePercentage = computed(() => {
    const total = props.totalIncome + props.totalExpenses
    return total > 0 ? (props.totalIncome / total) * 100 : 50
  })
  
  const expensePercentage = computed(() => {
    const total = props.totalIncome + props.totalExpenses
    return total > 0 ? (props.totalExpenses / total) * 100 : 50
  })
  </script>
  
  <style scoped>
  .balance-overview {
    height: fit-content;
    background: var(--color-background);
    border: 1px solid #e0e0e0;
    border-radius: 16px;
    padding: 25px;
  }
  
  .balance-overview h3 {
    font-size: 18px;
    font-family: 'Poppins', sans-serif;
    font-weight: 600;
    color: var(--color-text);
    margin: 0 0 20px 0;
  }
  
  .balance-chart {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  .current-balance {
    text-align: center;
  }
  
  .balance-label {
    font-size: 14px;
    color: #666;
    margin: 0 0 8px 0;
    font-family: 'Poppins', sans-serif;
  }
  
  .balance-amount {
    font-size: 24px;
    font-weight: 600;
    margin: 0;
    font-family: 'Poppins', sans-serif;
  }
  
  .balance-amount.positive {
    color: var(--color-charts-secondary);
  }
  
  .balance-amount.negative {
    color: var(--color-charts-three);
  }
  
  .balance-breakdown {
    display: flex;
    justify-content: space-between;
    gap: 10px;
  }
  
  .breakdown-item {
    flex: 1;
    text-align: center;
    padding: 10px;
    border-radius: 8px;
  }
  
  .breakdown-item.income {
    background: rgba(39, 174, 96, 0.1);
  }
  
  .breakdown-item.expense {
    background: rgba(231, 76, 60, 0.1);
  }
  
  .breakdown-label {
    display: block;
    font-size: 12px;
    color: #666;
    margin-bottom: 4px;
    font-family: 'Poppins', sans-serif;
  }
  
  .breakdown-amount {
    display: block;
    font-size: 14px;
    font-weight: 600;
    font-family: 'Poppins', sans-serif;
  }
  
  .breakdown-item.income .breakdown-amount {
    color: var(--color-charts-secondary);
  }
  
  .breakdown-item.expense .breakdown-amount {
    color: var(--color-charts-three);
  }
  
  .simple-chart {
    margin-top: 15px;
  }
  
  .chart-bar {
    height: 8px;
    background: #e0e0e0;
    border-radius: 4px;
    overflow: hidden;
    display: flex;
  }
  
  .income-bar {
    background: var(--color-charts-secondary);
    transition: width 0.3s ease;
  }
  
  .expense-bar {
    background: var(--color-charts-three);
    transition: width 0.3s ease;
  }
  
  .chart-labels {
    display: flex;
    justify-content: space-between;
    margin-top: 8px;
  }
  
  .chart-label {
    font-size: 12px;
    font-weight: 500;
    font-family: 'Poppins', sans-serif;
  }
  
  .chart-label.income {
    color: var(--color-charts-secondary);
  }
  
  .chart-label.expense {
    color: var(--color-charts-three);
  }
  </style>