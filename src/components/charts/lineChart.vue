<template>
    <div>
      <LineChart :data="chartData" :options="chartOptions" />
    </div>
  </template>
  
  <script>
  import LineChart from '@/components/charts/lineChart.vue'
  import { useTransactions } from '@/modules/useTransactions.js'
  import { computed, onMounted } from 'vue'

  import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler // Add this for area charts if needed
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler // Add this
)
  
  export default {
    name: 'Dashboard',
    components: {
      LineChart
    },
    setup() {
      const { transactions, getTransactions } = useTransactions()
  
      // Process transactions into chart data
      const chartData = computed(() => {
        if (!transactions.value || transactions.value.length === 0) {
          return {
            labels: [],
            datasets: []
          }
        }
  
        // Group transactions by date and calculate daily totals
        const dailyData = transactions.value.reduce((acc, transaction) => {
          const date = new Date(transaction.date).toLocaleDateString()
          if (!acc[date]) {
            acc[date] = { income: 0, expenses: 0 }
          }
          
          if (transaction.type === 'income') {
            acc[date].income += transaction.amount
          } else {
            acc[date].expenses += transaction.amount
          }
          
          return acc
        }, {})
  
        // Sort dates and prepare chart data
        const sortedDates = Object.keys(dailyData).sort((a, b) => new Date(a) - new Date(b))
        
        return {
          labels: sortedDates,
          datasets: [
            {
              label: 'Income',
              data: sortedDates.map(date => dailyData[date].income),
              borderColor: '#4CAF50',
              backgroundColor: 'rgba(76, 175, 80, 0.1)',
              tension: 0.4
            },
            {
              label: 'Expenses',
              data: sortedDates.map(date => dailyData[date].expenses),
              borderColor: '#F44336',
              backgroundColor: 'rgba(244, 67, 54, 0.1)',
              tension: 0.4
            },
            {
              label: 'Net Balance',
              data: sortedDates.map(date => dailyData[date].income - dailyData[date].expenses),
              borderColor: '#2196F3',
              backgroundColor: 'rgba(33, 150, 243, 0.1)',
              tension: 0.4
            }
          ]
        }
      })
  
      const chartOptions = {
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function(value) {
                return '$' + value.toLocaleString()
              }
            }
          }
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: function(context) {
                return context.dataset.label + ': $' + context.parsed.y.toLocaleString()
              }
            }
          }
        }
      }
  
      onMounted(() => {
        getTransactions()
      })
  
      return {
        chartData,
        chartOptions
      }
    }
  }
  </script>