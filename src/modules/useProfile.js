import { ref, computed } from 'vue'
import { updatePassword, deleteUser, updateProfile } from 'firebase/auth'
import { doc, deleteDoc, collection, getDocs, writeBatch } from 'firebase/firestore'
import { db } from './firebase'
import { useAuth } from './useAuth'
import { useTransactions } from './useTransactions'

export function useProfile() {
  const { currentUser } = useAuth()
  const { transactions, totalExpenses, totalIncome, balance } = useTransactions()

  // Reactive data
  const editingAccount = ref(false)
  const editDisplayName = ref('')
  const isProcessing = ref(false)

  // Computed properties
  const totalTransactions = computed(() => transactions.value.length)

  const userDisplayName = computed(() => {
    return currentUser.value?.displayName || currentUser.value?.email?.split('@')[0] || 'User'
  })

  const joinDate = computed(() => {
    if (currentUser.value?.metadata?.creationTime) {
      const creationDate = new Date(currentUser.value.metadata.creationTime)
      return creationDate.toLocaleDateString('en-GB', {
        year: 'numeric',
        month: 'long'
      })
    }
    return 'January 2024' // fallback
  })

  const lastLoginDate = computed(() => {
    return new Date().toLocaleDateString('en-GB')
  })

  const balanceChangeClass = computed(() => {
    return balance.value >= 0 ? 'positive' : 'negative'
  })

  const balanceChangeText = computed(() => {
    return balance.value >= 0 ? '+2.5% this month' : '-1.2% this month'
  })


  // Methods
  const editProfile = () => {
    editingAccount.value = true
    editDisplayName.value = userDisplayName.value
  }

  const exportData = async () => {
    try {
      const dataToExport = {
        user: {
          email: currentUser.value?.email,
          displayName: userDisplayName.value,
          exportDate: new Date().toISOString()
        },
        transactions: transactions.value,
        summary: {
          totalTransactions: totalTransactions.value,
          totalBalance: balance.value,
          totalExpenses: totalExpenses.value,
          totalIncome: totalIncome.value
        }
      }

      const dataStr = JSON.stringify(dataToExport, null, 2)
      const dataBlob = new Blob([dataStr], { type: 'application/json' })

      const url = URL.createObjectURL(dataBlob)
      const link = document.createElement('a')
      link.href = url
      link.download = `finance-data-${new Date().toISOString().split('T')[0]}.json`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)

      alert('Data exported successfully!')
    } catch (error) {
      console.error('Export failed:', error)
      alert('Failed to export data. Please try again.')
    }
  }

  const toggleAccountEdit = () => {
    if (editingAccount.value) {
      cancelAccountEdit()
    } else {
      editProfile()
    }
  }

  const saveAccountChanges = async () => {
    if (!editDisplayName.value.trim()) {
      alert('Display name cannot be empty')
      return
    }

    try {
      isProcessing.value = true

      await updateProfile(currentUser.value, {
        displayName: editDisplayName.value.trim()
      })

      editingAccount.value = false
      alert('Profile updated successfully!')
    } catch (error) {
      console.error('Failed to update profile:', error)
      alert('Failed to update profile. Please try again.')
    } finally {
      isProcessing.value = false
    }
  }

  const cancelAccountEdit = () => {
    editingAccount.value = false
    editDisplayName.value = userDisplayName.value
  }

  const changePassword = async () => {
    const newPassword = prompt('Enter your new password (minimum 6 characters):')

    if (!newPassword) {
      return
    }

    if (newPassword.length < 6) {
      alert('Password must be at least 6 characters long')
      return
    }

    const confirmPassword = prompt('Confirm your new password:')

    if (newPassword !== confirmPassword) {
      alert('Passwords do not match')
      return
    }

    try {
      isProcessing.value = true
      await updatePassword(currentUser.value, newPassword)
      alert('Password updated successfully!')
    } catch (error) {
      console.error('Password update failed:', error)
      if (error.code === 'auth/requires-recent-login') {
        alert('For security reasons, please log out and log back in before changing your password.')
      } else {
        alert('Failed to update password. Please try again.')
      }
    } finally {
      isProcessing.value = false
    }
  }

  const clearAllData = async () => {
    if (!confirm('Are you sure you want to clear all your transaction data? This action cannot be undone.')) {
      return
    }

    if (!confirm('This will permanently delete ALL your transactions. Are you absolutely sure?')) {
      return
    }

    try {
      isProcessing.value = true

      const transactionsRef = collection(db, 'users', currentUser.value.uid, 'transactions')
      const snapshot = await getDocs(transactionsRef)

      const batch = writeBatch(db)
      snapshot.docs.forEach(doc => {
        batch.delete(doc.ref)
      })

      await batch.commit()

      // Clear local state
      transactions.value = []

      alert('All transaction data has been cleared successfully!')
    } catch (error) {
      console.error('Failed to clear data:', error)
      alert('Failed to clear data. Please try again.')
    } finally {
      isProcessing.value = false
    }
  }

  const deleteAccount = async (router) => {
    if (!confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      return
    }

    if (!confirm('This will permanently delete your account and ALL your data. Type "DELETE" to confirm.')) {
      return
    }

    const confirmation = prompt('Type "DELETE" to confirm account deletion:')
    if (confirmation !== 'DELETE') {
      alert('Account deletion cancelled.')
      return
    }

    try {
      isProcessing.value = true

      const transactionsRef = collection(db, 'users', currentUser.value.uid, 'transactions')
      const transactionsSnapshot = await getDocs(transactionsRef)

      const batch = writeBatch(db)

      transactionsSnapshot.docs.forEach(doc => {
        batch.delete(doc.ref)
      })

      const userDocRef = doc(db, 'users', currentUser.value.uid)
      batch.delete(userDocRef)

      await batch.commit()

      await deleteUser(currentUser.value)

      alert('Account deleted successfully. You will be redirected to the home page.')
      router.push('/')
    } catch (error) {
      console.error('Account deletion failed:', error)
      if (error.code === 'auth/requires-recent-login') {
        alert('For security reasons, please log out and log back in before deleting your account.')
      } else {
        alert('Failed to delete account. Please try again.')
      }
    } finally {
      isProcessing.value = false
    }
  }

  return {
    // Reactive data
    editingAccount,
    editDisplayName,
    isProcessing,

    // Computed properties
    totalTransactions,
    userDisplayName,
    joinDate,
    lastLoginDate,
    balanceChangeClass,
    balanceChangeText,

    // Methods
    editProfile,
    exportData,
    toggleAccountEdit,
    saveAccountChanges,
    cancelAccountEdit,
    changePassword,
    clearAllData,
    deleteAccount
  }
}