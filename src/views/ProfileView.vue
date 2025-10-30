<template>
  <div class="profile-container">
    <!-- Side Menu -->
    <div class="side-menu">
      <div class="user-profile">
        <div class="profile-image">
          <img src="@/assets/icons/user-solid.svg" alt="User Profile">
        </div>
        <div class="user-info">
          <h2>{{ userDisplayName }}</h2>
          <p>Balance: {{ formatCurrency(balance) }}</p>
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
        <!-- Profile Header -->
        <div class="profile-header">
          <div class="header-left">
            <div class="profile-avatar">
              <img src="@/assets/icons/user-solid.svg" alt="Profile">
            </div>
            <div class="header-info">
              <h1>{{ userDisplayName }}</h1>
              <p class="user-email">{{ currentUser?.email }}</p>
              <div class="account-status">
                <span class="status-badge active">Active Account</span>
                <span class="join-date">Member since {{ joinDate }}</span>
              </div>
            </div>
          </div>
          <div class="header-actions">
            <button class="action-btn primary" @click="editProfile">
              <img src="@/assets/icons/pencil-solid-full.svg" alt="Edit">
              Edit Profile
            </button>
            <button class="action-btn secondary" @click="exportData">
              <img src="@/assets/icons/file-solid-full.svg" alt="Export">
              Export Data
            </button>
          </div>
        </div>

        <!-- Stats Overview -->
        <div class="stats-grid">

          <div class="stat-card balance">
            <div class="stat-icon">
              <img src="@/assets/icons/chart-line-solid-full.svg" alt="Balance">
            </div>
            <div class="stat-content">
              <h3>Current Balance</h3>
              <p class="stat-value">{{ balance.toFixed(2) }}</p>
              <span class="stat-change" :class="balanceChangeClass">{{ balanceChangeText }}</span>
            </div>
          </div>

          <div class="stat-card expenses">
            <div class="stat-icon">
              <img src="@/assets/icons/arrow-trend-down-solid-full.svg" alt="Expenses">
            </div>
            <div class="stat-content">
              <h3>Total Expenses</h3>
              <p class="stat-value expense">-{{ totalExpenses.toFixed(2) }}</p>
            </div>
          </div>

          <div class="stat-card income">
            <div class="stat-icon">
              <img src="@/assets/icons/arrow-trend-up-solid-full.svg" alt="Income">
            </div>
            <div class="stat-content">
              <h3>Total Income</h3>
              <p class="stat-value income">+{{ totalIncome.toFixed(2) }}</p>
            </div>
          </div>
        </div>

        <!-- Main Content Sections -->
        <div class="content-sections">
          <!-- Account Information -->
          <div class="section-card">
            <div class="section-header">
              <h3>
                <img src="@/assets/icons/user-solid.svg" alt="Account">
                Account Information
              </h3>
              <button class="edit-btn" @click="toggleAccountEdit">
                <img src="@/assets/icons/pencil-solid-full.svg" alt="Edit">
              </button>
            </div>
            <div class="section-content">
              <div class="info-grid">
                <div class="info-item">
                  <label>Display Name</label>
                  <div class="info-value" v-if="!editingAccount">{{ userDisplayName }}</div>
                  <input v-else v-model="editDisplayName" class="edit-input" type="text">
                </div>
                <div class="info-item">
                  <label>Email Address</label>
                  <div class="info-value">{{ currentUser?.email }}</div>
                </div>
                <div class="info-item">
                  <label>Account Type</label>
                  <div class="info-value">
                    <span class="account-type">Personal Account</span>
                  </div>
                </div>
                <div class="info-item">
                  <label>Last Login</label>
                  <div class="info-value">{{ lastLoginDate }}</div>
                </div>
              </div>
              <div v-if="editingAccount" class="edit-actions">
                <button class="save-btn" @click="saveAccountChanges">Save Changes</button>
                <button class="cancel-btn" @click="cancelAccountEdit">Cancel</button>
              </div>
            </div>
          </div>


          <!-- Account Actions -->
          <div class="section-card danger-zone">
            <div class="section-header">
              <h3>
                <img src="@/assets/icons/gear-solid-full.svg" alt="Warning">
                Account Settigns
              </h3>
            </div>
            <div class="section-content">
              <div class="danger-actions">
                <div class="danger-item">
                  <div class="danger-info">
                    <h4>Change Password</h4>
                    <p>Update your account password for security</p>
                  </div>
                  <button class="danger-btn secondary" @click="changePassword" :disabled="isProcessing">
                    {{ isProcessing ? 'Processing...' : 'Change Password' }}
                  </button>
                </div>

                <div class="danger-item">
                  <div class="danger-info">
                    <h4>Clear All Data</h4>
                    <p>Permanently delete all your transactions</p>
                  </div>
                  <button class="danger-btn warning" @click="clearAllData" :disabled="isProcessing">
                    {{ isProcessing ? 'Clearing...' : 'Clear Data' }}
                  </button>
                </div>

                <div class="danger-item">
                  <div class="danger-info">
                    <h4>Delete Account</h4>
                    <p>Permanently delete your account and all data</p>
                  </div>
                  <button class="danger-btn primary" @click="() => deleteAccount(router)" :disabled="isProcessing">
                    {{ isProcessing ? 'Deleting...' : 'Delete Account' }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/modules/useAuth'
import { useTransactions } from '@/modules/useTransactions'
import { useProfile } from '@/modules/useProfile'

const router = useRouter()
const { currentUser, logout } = useAuth()
const { balance, totalExpenses, totalIncome } = useTransactions()
const { formatCurrency } = useCurrency()

// Use the profile module (removed financial summary related properties)

const {
  // Reactive data
  editingAccount,
  editDisplayName,
  isProcessing,

  // Computed properties 
  totalTransactions,
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
} = useProfile()

const handleLogout = async () => {
  try {
    await logout()
    router.push('/')
  } catch (error) {
    console.error('Logout failed:', error)
    alert('Failed to logout. Please try again.')
  }
}

const userDisplayName = computed(() => {
  return currentUser.value?.displayName || currentUser.value?.email?.split('@')[0] || 'User'
})

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

.profile-container {
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

/* New profile styles */
.profile-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  background: white;
  border-radius: 16px;
  padding: 30px;
  margin-bottom: 30px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.header-left {
  display: flex;
  align-items: center;
  gap: 20px;
}

.profile-avatar {
  position: relative;
  width: 80px;
  height: 80px;
  background: var(--color-main);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.profile-avatar img {
  width: 40px;
  height: 40px;
  filter: brightness(0) saturate(100%) invert(100%);
}

.edit-avatar-btn {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 28px;
  height: 28px;
  background: var(--color-charts);
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.edit-avatar-btn img {
  width: 14px;
  height: 14px;
  filter: brightness(0) saturate(100%) invert(100%);
}

.header-info h1 {
  font-size: 28px;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 5px;
  font-family: 'Poppins', sans-serif;
}

.user-email {
  font-size: 16px;
  color: #666;
  margin-bottom: 10px;
  font-family: 'Poppins', sans-serif;
}

.account-status {
  display: flex;
  align-items: center;
  gap: 15px;
}

.status-badge {
  background: #e8f5e8;
  color: #2d8f47;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
}

.join-date {
  font-size: 12px;
  color: #999;
}

.header-actions {
  display: flex;
  gap: 10px;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Poppins', sans-serif;
}

.action-btn.primary {
  background: var(--color-main);
  color: var(--color-text);
}

.action-btn.secondary {
  color: var(--color-text);
}

.action-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.action-btn img {
  color: var(--color-text);
  width: 14px;
  height: 14px;
}



/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.stat-card {
  background: white;
  border-radius: 12px;
  padding: 25px;
  display: flex;
  align-items: center;
  gap: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-2px);
}

.stat-icon {
  width: 50px;
  height: 50px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.stat-card.balance .stat-icon {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.stat-card.transactions .stat-icon {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}

.stat-card.expenses .stat-icon {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
}

.stat-card.income .stat-icon {
  background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
}

.stat-icon img {
  width: 24px;
  height: 24px;
  filter: brightness(0) saturate(100%) invert(100%);
}

.stat-content h3 {
  font-size: 14px;
  color: #666;
  margin-bottom: 8px;
  font-family: 'Poppins', sans-serif;
}

.stat-value {
  font-size: 24px;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 4px;
  font-family: 'Poppins', sans-serif;
}

.stat-value.expense {
  color: #e74c3c;
}

.stat-value.income {
  color: #27ae60;
}

.stat-change {
  font-size: 12px;
}

.stat-change.positive {
  color: #27ae60;
}

.stat-change.negative {
  color: #e74c3c;
}

.stat-subtitle {
  font-size: 12px;
  color: #999;
}


/* Content Sections */
.content-sections {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.section-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

.section-card.danger-zone {
  border: 1px solid #fee;
}

.section-header {
  background: #f8f9fa;
  padding: 20px 25px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.section-header h3 {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 18px;
  font-weight: 600;
  color: var(--color-text);
  font-family: 'Poppins', sans-serif;
}

.section-header h3 img {
  width: 20px;
  height: 20px;
  filter: opacity(0.7);
}

.edit-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 6px;
  transition: background 0.3s ease;
}

.edit-btn:hover {
  background: #e9ecef;
}

.edit-btn img {
  width: 16px;
  height: 16px;
}

.section-content {
  padding: 25px;
}

/* Info Grid */
.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 20px;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.info-item label {
  font-size: 14px;
  font-weight: 500;
  color: #666;
  font-family: 'Poppins', sans-serif;
}

.info-value {
  font-size: 16px;
  color: var(--color-text);
  padding: 12px 0;
  border-bottom: 1px solid #f0f0f0;
  font-family: 'Poppins', sans-serif;
}

.account-type {
  background: #e8f5e8;
  color: #2d8f47;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
}

.edit-input {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 16px;
  font-family: 'Poppins', sans-serif;
}

.edit-actions {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

.save-btn,
.cancel-btn {
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  font-family: 'Poppins', sans-serif;
}

.save-btn {
  background: var(--color-main);
  color: var(--color-text);
}

.cancel-btn {
  background: #f5f5f5;
  color: var(--color-text);
}

/* Financial Overview */
.financial-overview {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.overview-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  background: #f8f9fa;
  border-radius: 8px;
}

.overview-label {
  font-size: 14px;
  color: #666;
  font-family: 'Poppins', sans-serif;
}

.overview-value {
  font-size: 16px;
  font-weight: 600;
  color: var(--color-text);
  font-family: 'Poppins', sans-serif;
}

.overview-value.expense {
  color: #e74c3c;
}

.overview-value.income {
  color: #27ae60;
}



/* Danger Zone */
.danger-actions {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.danger-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border: 1px solid #fee;
  border-radius: 8px;
  background: #fafafa;
}

.danger-info h4 {
  font-size: 16px;
  font-weight: 500;
  color: var(--color-text);
  margin-bottom: 4px;
  font-family: 'Poppins', sans-serif;
}

.danger-info p {
  font-size: 14px;
  color: #666;
  font-family: 'Poppins', sans-serif;
}

.danger-btn {
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  font-weight: 500;
  font-family: 'Poppins', sans-serif;
  transition: all 0.3s ease;
}

.danger-btn.secondary {
  background: #6c757d;
  color: white;
}

.danger-btn.warning {
  background: #ffc107;
  color: #212529;
}

.danger-btn.primary {
  background: #dc3545;
  color: white;
}

.danger-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

/* Responsive Design */
@media (max-width: 1200px) {
  .stats-grid {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }

  .info-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .profile-header {
    flex-direction: column;
    gap: 20px;
    text-align: center;
  }

  .header-actions {
    width: 100%;
    justify-content: center;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }

  .financial-overview {
    grid-template-columns: 1fr;
  }

  .danger-item {
    flex-direction: column;
    gap: 15px;
    text-align: center;
  }
}
</style>