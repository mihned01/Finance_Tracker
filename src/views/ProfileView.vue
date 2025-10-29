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
      </div>
    </div>

    <!-- Profile Content -->
    <div class="profile-content">
          <h1>Profile</h1>
          
          <div class="profile-info">
            <h3>Account Information</h3>
            <div class="info-item">
              <strong>Email:</strong> {{ currentUser?.email }}
            </div>
            <div class="info-item">
              <strong>Current Balance:</strong> DK {{ balance.toFixed(2) }}
            </div>
            <div class="info-item">
              <strong>Total Transactions:</strong> {{ totalTransactions }}
            </div>
          </div>
          
          <div class="profile-section">
            <h3>Account Settings</h3>
            <p>Profile settings and account management features coming soon...</p>
          </div>
        </div>

  </div>
</template>
  
<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/modules/useAuth'
import { useTransactions } from '@/modules/useTransactions'

const router = useRouter()
const { currentUser, logout } = useAuth()
const { balance, transactions } = useTransactions()

// Computed property for total transactions count
const totalTransactions = computed(() => {
  return transactions.value.length
})

const handleLogout = async () => {
  await logout()
  router.push('/')
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
  width: 40px;
  height: 40px;
  padding: 10px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.2);
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



/* Main content */

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

/* Profile specific styles */
.profile-content {
  padding: 20px 0;
}

.profile-content h1 {
  font-size: 32px;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 30px;
  font-family: 'Poppins', sans-serif;
}

.profile-info,
.profile-section {
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  padding: 25px;
  margin-bottom: 25px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.profile-info h3,
.profile-section h3 {
  font-size: 20px;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 20px;
  font-family: 'Poppins', sans-serif;
}

.info-item {
  font-size: 16px;
  color: var(--color-text);
  margin-bottom: 12px;
  font-family: 'Poppins', sans-serif;
  padding: 8px 0;
  border-bottom: 1px solid #f0f0f0;
}

.info-item:last-child {
  border-bottom: none;
  margin-bottom: 0;
}

.info-item strong {
  color: var(--color-main);
  margin-right: 10px;
}

.profile-section p {
  font-size: 16px;
  color: var(--color-text);
  font-family: 'Poppins', sans-serif;
  line-height: 1.5;
}

</style>