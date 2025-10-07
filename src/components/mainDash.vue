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
            <p>Balance: DK 10.000,00</p>
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
  
      <!-- Main Content -->
      <div class="main-content">
        <div class="main-content-container">
          <RouterView />
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router'
  import { useAuth } from '@/modules/useAuth'
  
  const router = useRouter()
  const { currentUser, logout } = useAuth()
  
  const handleLogout = async () => {
    await logout()
    router.push('/')
  }
  </script>
  
  <style scoped>
  .dashboard-container {
    display: flex;
    background-color: var(--color-main);
    min-height: 100vh;
  }
  
  .side-menu {
    width: 30%;
    background-color: var(--color-main);
    padding: 40px 0 40px 40px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  
  .user-profile {
    margin-bottom: 2rem;
  }
  
  .profile-image {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.2);
    margin-bottom: 1rem;
  }
  
  .user-info h2 {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
  }
  
  .user-info p {
    font-size: 0.9rem;
    opacity: 0.8;
  }
  
  .menu-items {
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
    transition: background-color 0.3s;
  }
  
  .menu-item:hover,
  .menu-item.router-link-active {
    background-color: rgba(255, 255, 255, 0.1);
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
  
  .main-content {
    width: 70%;
    background-color: var(--color-main);
    padding: 40px 40px 0 40px;
  }

  .main-content-container {
    width: 100%;
    background-color: var(--color-background);
    border-radius: 16px;
    height: 100%;
    overflow-y: auto;
  }
  </style>