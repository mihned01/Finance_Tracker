<template>
    <div class="heatmap-chart-card">
      <h3>{{ title }}</h3>
      <div class="heatmap-container">
        <div class="month-selector">
          <button @click="previousMonth" class="nav-btn">‹</button>
          <span class="current-month">{{ currentMonthName }} {{ currentYear }}</span>
          <button @click="nextMonth" class="nav-btn">›</button>
        </div>
        
        <div class="heatmap-grid">
          <div class="weekday-labels">
            <div v-for="day in weekdays" :key="day" class="weekday">{{ day }}</div>
          </div>
          <div class="calendar-grid">
            <div 
              v-for="day in calendarDays" 
              :key="`${day.date}-${day.month}`"
              class="day-cell"
              :class="{ 
                'other-month': day.month !== selectedMonth,
                'today': isToday(day.fullDate),
                'has-spending': day.amount > 0
              }"
              :style="{ backgroundColor: getDayColor(day.amount) }"
              :title="`${day.date}: DK ${day.amount.toFixed(2)}`"
            >
              <span class="day-number">{{ day.date }}</span>
              <span v-if="day.amount > 0" class="day-amount">{{ day.amount.toFixed(0) }}</span>
            </div>
          </div>
        </div>
        
        <div class="legend">
          <span class="legend-label">Less</span>
          <div class="legend-colors">
            <div v-for="i in 5" :key="i" class="legend-color" :style="{ backgroundColor: getLegendColor(i) }"></div>
          </div>
          <span class="legend-label">More</span>
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
    },
    title: {
      type: String,
      default: 'Daily Spending Heat Map'
    }
  })
  
  const selectedMonth = ref(new Date().getMonth())
  const selectedYear = ref(new Date().getFullYear())
  
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  
  const currentMonthName = computed(() => {
    return new Date(selectedYear.value, selectedMonth.value).toLocaleDateString('en-US', { month: 'long' })
  })
  
  const currentYear = computed(() => selectedYear.value)
  
  const previousMonth = () => {
    if (selectedMonth.value === 0) {
      selectedMonth.value = 11
      selectedYear.value--
    } else {
      selectedMonth.value--
    }
  }
  
  const nextMonth = () => {
    if (selectedMonth.value === 11) {
      selectedMonth.value = 0
      selectedYear.value++
    } else {
      selectedMonth.value++
    }
  }
  
  const calendarDays = computed(() => {
    const days = []
    const firstDay = new Date(selectedYear.value, selectedMonth.value, 1)
    const lastDay = new Date(selectedYear.value, selectedMonth.value + 1, 0)
    const startDate = new Date(firstDay)
    startDate.setDate(startDate.getDate() - firstDay.getDay())
  
    // Generate 42 days (6 weeks)
    for (let i = 0; i < 42; i++) {
      const currentDate = new Date(startDate)
      currentDate.setDate(startDate.getDate() + i)
      
      const dayAmount = getDayAmount(currentDate)
      
      days.push({
        date: currentDate.getDate(),
        month: currentDate.getMonth(),
        year: currentDate.getFullYear(),
        fullDate: new Date(currentDate),
        amount: dayAmount
      })
    }
  
    return days
  })
  
  const getDayAmount = (date) => {
    return props.transactions
      .filter(t => {
        if (t.type !== 'expense' || !t.date) return false
        
        const transactionDate = new Date(t.date)
        return transactionDate.toDateString() === date.toDateString()
      })
      .reduce((sum, t) => sum + Math.abs(t.amount), 0)
  }
  
  const maxAmount = computed(() => {
    return Math.max(...calendarDays.value.map(day => day.amount), 1)
  })
  
  const getDayColor = (amount) => {
    if (amount === 0) return '#f8f9fa'
    
    const intensity = amount / maxAmount.value
    const opacity = Math.max(0.1, Math.min(1, intensity))
    
    return `rgba(255, 107, 107, ${opacity})`
  }
  
  const getLegendColor = (level) => {
    const opacity = level * 0.2
    return `rgba(255, 107, 107, ${opacity})`
  }
  
  const isToday = (date) => {
    const today = new Date()
    return date.toDateString() === today.toDateString()
  }
  </script>
  
  <style scoped>
  .heatmap-chart-card {
    background: var(--color-background);
    border: 1px solid #e0e0e0;
    border-radius: 16px;
    padding: 25px;
  }
  
  .heatmap-chart-card h3 {
    font-family: 'Poppins', sans-serif;
    font-size: 18px;
    font-weight: 600;
    color: var(--color-text);
    margin: 0 0 20px 0;
  }
  
  .month-selector {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 15px;
    margin-bottom: 20px;
  }
  
  .nav-btn {
    background: none;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    width: 30px;
    height: 30px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    color: var(--color-text);
    transition: all 0.3s ease;
  }
  
  .nav-btn:hover {
    background: #f0f0f0;
  }
  
  .current-month {
    font-size: 16px;
    font-weight: 600;
    color: var(--color-text);
    font-family: 'Poppins', sans-serif;
    min-width: 150px;
    text-align: center;
  }
  
  .heatmap-grid {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  
  .weekday-labels {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 2px;
  }
  
  .weekday {
    text-align: center;
    font-size: 12px;
    font-weight: 600;
    color: #666;
    padding: 8px 4px;
    font-family: 'Poppins', sans-serif;
  }
  
  .calendar-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 2px;
  }
  
  .day-cell {
    aspect-ratio: 1;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    cursor: pointer;
    transition: all 0.3s ease;
    min-height: 35px;
  }
  
  .day-cell:hover {
    transform: scale(1.1);
    z-index: 1;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }
  
  .day-cell.other-month {
    opacity: 0.3;
  }
  
  .day-cell.today {
    border: 2px solid #4facfe;
    font-weight: 600;
  }
  
  .day-number {
    font-size: 11px;
    font-weight: 500;
    color: var(--color-text);
    font-family: 'Poppins', sans-serif;
  }
  
  .day-amount {
    font-size: 9px;
    color: #666;
    font-family: 'Poppins', sans-serif;
  }
  
  .legend {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    margin-top: 20px;
  }
  
  .legend-label {
    font-size: 12px;
    color: #666;
    font-family: 'Poppins', sans-serif;
  }
  
  .legend-colors {
    display: flex;
    gap: 2px;
  }
  
  .legend-color {
    width: 12px;
    height: 12px;
    border-radius: 2px;
    border: 1px solid #e0e0e0;
  }
  </style>