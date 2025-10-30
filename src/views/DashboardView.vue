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
          <p>Balance: DK {{ balance.toFixed(2) }}</p>
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

        <div class="dashboard-header">

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
</style>