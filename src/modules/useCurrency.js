import { ref, computed } from 'vue'

const selectedCurrency = ref('DKK')

// Load from localStorage on init
const loadCurrency = () => {
  const saved = localStorage.getItem('userPreferences')
  if (saved) {
    const preferences = JSON.parse(saved)
    selectedCurrency.value = preferences.currency || 'DKK'
  }
}

loadCurrency()

export function useCurrency() {
  const currencySymbol = computed(() => {
    switch (selectedCurrency.value) {
      case 'EUR': return '€'
      case 'USD': return '$'
      case 'DKK':
      default: return 'DK'
    }
  })

  const formatCurrency = (amount) => {
    const symbol = currencySymbol.value
    const formattedAmount = Math.abs(amount).toFixed(2)
    
    switch (selectedCurrency.value) {
      case 'EUR':
      case 'USD':
        return `${symbol}${formattedAmount}`
      case 'DKK':
      default:
        return `${symbol} ${formattedAmount}`
    }
  }

  const updateCurrency = (newCurrency) => {
    selectedCurrency.value = newCurrency
    // Update localStorage
    const preferences = JSON.parse(localStorage.getItem('userPreferences') || '{}')
    preferences.currency = newCurrency
    localStorage.setItem('userPreferences', JSON.stringify(preferences))
  }

  return {
    selectedCurrency,
    currencySymbol,
    formatCurrency,
    updateCurrency
  }
}