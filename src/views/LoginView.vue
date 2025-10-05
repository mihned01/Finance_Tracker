<template>
    <div class="auth-container">
      <div class="form-container" :class="{ 'slide-left': isRegistering }">
        
        <!-- Login Form -->
        <div class="form-section login">
          <div class="form-content">
            <div class="green-section login">
              <h2>Hello, Welcome!</h2>
              <p>Don't have an account?</p>
              <button @click="toggleForm" class="switch-btn">Register</button>
            </div>
            <div class="form-fields">
              <h1>Login</h1>
              <form @submit.prevent="loginUser">
                <div class="input-group">
                  <input type="email" v-model="email" placeholder="Username" required>
                </div>
                <div class="input-group">
                  <input type="password" v-model="password" placeholder="Password" required>
                </div>
                <p class="forgot-password">Forgot password?</p>
                <button type="submit" :disabled="loading" class="submit-btn">Login</button>
              </form>
            </div>
          </div>
        </div>
  
        <!-- Register Form -->
        <div class="form-section register">
          <div class="form-content">
            <div class="form-fields">
              <h1>Registration</h1>
              <form @submit.prevent="registerUser">
                <div class="input-group">
                  <input type="email" v-model="regEmail" placeholder="Username" required>
                </div>
                <div class="input-group">
                  <input type="password" v-model="regPassword" placeholder="Password" required>
                </div>
                <button type="submit" :disabled="loading" class="submit-btn">Register</button>
              </form>
            </div>
            <div class="green-section register">
              <h2>Welcome back!</h2>
              <p>Already have an account?</p>
              <button @click="toggleForm" class="switch-btn">Login</button>
            </div>
          </div>
        </div>
      </div>
  
      <div class="error" v-if="authError">
        <p>{{ authError }}</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useAuth } from '../modules/useAuth.js'
  import { useRouter } from 'vue-router'
  
  const router = useRouter()
  const { login, register, authError, loading, isLoggedIn, currentUser } = useAuth()
  const isRegistering = ref(false)
  
  const email = ref('')
  const password = ref('')
  const regEmail = ref('')
  const regPassword = ref('')
  
  const toggleForm = () => {
    isRegistering.value = !isRegistering.value
  }
  
  const loginUser = async () => {
    await login(email.value, password.value)
    if (isLoggedIn.value) {
      router.push('/dashboard')
    }
  }
  
  const registerUser = async () => {
    await register(regEmail.value, regPassword.value)
    if (!authError.value) {
      isRegistering.value = false
    }
  }
  </script>
  
  <style scoped>
  .auth-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: var(--color-main);
    padding: 20px;
  }
  
  .form-container {
    width: 900px;
    height: 500px;
    position: relative;
    overflow: hidden;
    border-radius: 20px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease;
  }
  
  .form-section {
    position: absolute;
    width: 100%;
    height: 100%;
    transition: all 0.6s ease;
  }
  
  .form-content {
    display: flex;
    width: 100%;
    height: 100%;
    background: white;
  }
  
  .green-section {
    width: 50%;
    background-color: var(--color-main);
    padding: 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: var(--color-text);
  }

  .green-section h2 {
    font-size: 28px;
    font-family: Poppins, sans-serif;
    font-weight: 600;
    margin-bottom: 10px;
  }

  .green-section.login {
    border-radius: 0 120px 120px 0;
  }

  .green-section.register {
    border-radius: 120px 0 0 120px;
  }
  
  .form-fields {
    width: 50%;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  
  .input-group {
    margin-bottom: 20px;
  }
  
  input {
    width: 100%;
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 16px;
  }
  
  .submit-btn {
    width: 100%;
    padding: 10px 20px;
    margin-top: 10px;
    background-color: var(--color-main);
    color: var(--color-button);
    border: 1.5px solid transparent;
    border-radius: 8px;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.3s ease;
    align-items: center;
  }

  .submit-btn:hover {
    background-color: var(--color-background);
    color: var(--color-text);
    border: 1.5px solid var(--color-main);
  }
  
  .switch-btn {
     padding: 10px 20px;
     margin-top: 30px;
     background-color: var(--color-button);
     color: var(--color-background);
     border: 1.5px solid transparent;
     border-radius: 8px;
     font-size: 14px;
     cursor: pointer;
     transition: all 0.3s ease;
     align-items: center;
  }

  .switch-btn:hover {
    background-color: var(--color-background);
    color: var(--color-button);
    border: 1.5px solid var(--color-button);
  }
  
  .forgot-password {
    font-size: 14px;
    display: block;
    text-align: center;
    color: #666;
    text-decoration: none;
    margin: 10px 0;
  }
  
  .error {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background-color: #ff4444;
    color: white;
    padding: 10px 20px;
    border-radius: 8px;
  }
  
  /* Animation classes */
  .slide-left .login {
    transform: translateX(-100%);
  }
  
  .register {
    transform: translateX(100%);
  }
  
  .slide-left .register {
    transform: translateX(0);
  }
  
  h1 {
    margin-bottom: 30px;
    color: var(--color-text);
  }
  
  h2 {
    margin-bottom: 20px;
    color: var(--color-text);
  }
  </style>