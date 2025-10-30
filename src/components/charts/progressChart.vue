<template>
    <div class="progress-chart-card">
      <h3>{{ title }}</h3>
      <div class="progress-container">
        <div v-for="goal in goalData" :key="goal.category" class="goal-item">
          <div class="goal-header">
            <div class="goal-info">
              <span class="goal-category">{{ goal.category }}</span>
              <span class="goal-amount">DK {{ goal.current.toFixed(0) }} / DK {{ goal.target.toFixed(0) }}</span>
            </div>
            <span class="goal-percentage" :class="{ 'over-budget': goal.percentage > 100 }">
              {{ goal.percentage.toFixed(0) }}%
            </span>
          </div>
          <div class="progress-bar">
            <div 
              class="progress-fill" 
              :style="{ 
                width: `${Math.min(goal.percentage, 100)}%`,
                background: goal.percentage > 100 ? '#ff6b6b' : getCategoryColor(goal.category)
              }"
            ></div>
            <div 
              v-if="goal.percentage > 100"
              class="over-budget-indicator"
              :style="{ width: `${goal.percentage - 100}%` }"
            ></div>
          </div>
        </div>
        <div v-if="goalData.length === 0" class="no-data">
          <p>No budget goals set</p>
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
    },
    title: {
      type: String,
      default: 'Budget Goals'
    },
    budgetGoals: {
      type: Object,
      default: () => ({
        'Food & Drinks': 2000,
        'Transport': 1500,
        'Shopping': 1000,
        'Healthcare': 800,
        'Travel': 3000
      })
    }
  })
  
  const getCategoryColor = (category) => {
    const categoryColors = {
      'Rent & Bills': '#4facfe',
      'Transport': '#00d4aa',      
      'Healthcare': '#ff6b6b',      
      'Education': '#ff8c42',      
      'Salary': '#51cf66',      
      'Food & Drinks': '#ffd43b',  
      'Food': '#ffd43b',             
      'Shopping': '#9775fa',    
      'Travel': '#ff8cc8',           
      'Utilities': '#339af0',         
      'Other': '#868e96' 
    }
    return categoryColors[category] || categoryColors['Other']
  }
  
  const goalData = computed(() => {
    const currentMonth = new Date().getMonth()
    const currentYear = new Date().getFullYear()
  
    return Object.entries(props.budgetGoals).map(([category, target]) => {
      const currentSpent = props.transactions
        .filter(t => {
          if (t.type !== 'expense' || t.category !== category) return false
          
          const date = new Date(t.date)
          return date.getMonth() === currentMonth && date.getFullYear() === currentYear
        })
        .reduce((sum, t) => sum + Math.abs(t.amount), 0)
  
      return {
        category,
        current: currentSpent,
        target,
        percentage: target > 0 ? (currentSpent / target) * 100 : 0
      }
    }).sort((a, b) => b.percentage - a.percentage)
  })
  </script>
  
  <style scoped>
  .progress-chart-card {
    background: var(--color-background);
    border: 1px solid #e0e0e0;
    border-radius: 16px;
    padding: 25px;
  }
  
  .progress-chart-card h3 {
    font-family: 'Poppins', sans-serif;
    font-size: 18px;
    font-weight: 600;
    color: var(--color-text);
    margin: 0 0 20px 0;
  }
  
  .progress-container {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  
  .goal-item {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  
  .goal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .goal-info {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  
  .goal-category {
    font-size: 14px;
    font-weight: 600;
    color: var(--color-text);
    font-family: 'Poppins', sans-serif;
  }
  
  .goal-amount {
    font-size: 12px;
    color: #666;
    font-family: 'Poppins', sans-serif;
  }
  
  .goal-percentage {
    font-size: 14px;
    font-weight: 600;
    color: var(--color-text);
    font-family: 'Poppins', sans-serif;
  }
  
  .goal-percentage.over-budget {
    color: #ff6b6b;
  }
  
  .progress-bar {
    height: 8px;
    background: #f0f0f0;
    border-radius: 4px;
    overflow: hidden;
    position: relative;
  }
  
  .progress-fill {
    height: 100%;
    transition: width 0.3s ease;
    border-radius: 4px;
  }
  
  .over-budget-indicator {
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    background: repeating-linear-gradient(
      45deg,
      #ff6b6b,
      #ff6b6b 4px,
      #ff9999 4px,
      #ff9999 8px
    );
    border-radius: 4px;
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