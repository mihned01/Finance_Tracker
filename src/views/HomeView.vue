<template>
  <main class="hero-container">
     <div class="hero">
         <div class="hero-left">
             <h1 class="static-text">Manage your personal finances smart & simple</h1>
             <p class="static-text">Track spending, manage budgets, and grow your savings — all in one place with MoneyMate.</p>
             <button class="static-theme" @click="navigateToLogin">Login</button>
         </div>
         <div class="hero-right">
            <div class="transaction-card">
                <div class="row1">
                    <div class="transaction-item">
                        <div class="category-icon shopping">
                            <img src="@/assets/icons/bag-shopping-solid-full.svg" alt="icon">
                        </div>
                        <div class="transaction-details">
                            <div class="details-left">
                               <p>Shopping</p>
                                <p class="date">15/09/2025</p> 
                            </div>
                            <div class="details-right">
                                <p>DK -2489,00</p>
                            </div>
                        </div>
                        
                    </div>
                    <div class="add-circle">+</div>
                </div>
                
                <div class="balance-card">
                    <div class="balance-left">
                       <h3>Total Balance:</h3>
                        <p class="balance">DK 10 000,00</p>
                        <div class="month-select">
                        <!--Left for future code: <option>Sept 2025</option> -->
                        Sept 2025
                        </div> 
                    </div>
                    <div class="balance-right">
                        <img src="@/assets/icons/chart-column-solid-full.svg" alt="icon">
                    </div>
                    
                </div>

                <div class="row2">
                     <div class="add-circle">+</div>
                    <div class="transaction-item">
                     
                        <div class="category-icon transport">
                            <img src="@/assets/icons/car-solid-full.svg" alt="icon">
                        </div>
                        <div class="transaction-details"> 
                        <div class="details-left">
                            <p>Transport</p>
                            <p class="date">13/08/2025</p> 
                        </div>
                        <div class="details-right">
                            <p>DK -489,00</p>
                        </div>
                        </div>
                    </div> 
                </div>  
            </div>
        </div> 
     </div>
  </main>
 
 
 
 </template>
 
 
 
 <script setup>
 import { useRouter } from 'vue-router'

const router = useRouter()

const navigateToLogin = () => {
  router.push('/login')
}



 </script>
 
 
 
 <style scoped>
 
 .hero-container {
     /* width: 100%; */
     height: 80vh;
     margin: 0 40px;
     display: flex;
     flex-direction: column;
     align-items: center;
     /* justify-content: center; */
     background-color: var(#fafafa);
 }
 
 /* .nav-bar {
     width: 90%;
     height: 10vh;
     margin: 40px;
     display: flex;
     flex-direction: row;
     align-items: center;
     justify-content: space-between;
 }
 
 .nav-bar p {
     font-size: 24px;
     font-weight: bold;
     color: var(--color-text);
 }
 
 .nav-bar button {
     padding: 10px 20px;
     background-color: var(--color-button);
     color: white;
     border: none;
     border-radius: 10px;
     font-size: 16px;
 } */

 .hero {
     width: 100%;
     height: 70vh;
     display: flex;
     align-items: center;
     justify-content: space-between;
     padding: 0 5%;
     background-color: var(--color-main);
     border-radius: 20px
 }

 .hero-left {
     width: 45%;
     height: 100%;
     display: flex;
     flex-direction: column;
     align-items: flex-start;
     justify-content: center;
     margin: 0 20px;
 }

 .hero-left h1 {
     font-size: 32px;
     font-family: Poppins, sans-serif;
     font-weight: bold;
     color: var(--color-text);
     align-items: center;
 }

 .hero-left p {
     font-size: 18px;
     font-family: Poppins, sans-serif;
     color: var(--color-text);
     margin: 10px 0 20px 0;
     align-items: center;
 }

 .hero-left button {
     padding: 10px 20px;
     margin: 10px 0;
     background-color: var(--color-button);
     color: var(--color-background);
     border: 1.5px solid transparent;
     border-radius: 8px;
     font-size: 14px;
     cursor: pointer;
     transition: all 0.3s ease;
     align-items: center;
 }

 .hero-left button:hover {
    background-color: var(--color-background);
    color: var(--color-button);
    border: 1.5px solid var(--color-button);
}


.hero-right {
  width: 50%;
  height: 100%;
  margin: 0 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.transaction-card {
  background: var(--color-main);
  border-radius: 16px;
  width: 100%;
  max-width: 400px;
}

.row1 {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  margin-bottom: 15px;
}

.row2 {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  margin-bottom: 15px;
}

.add-circle {
  position: static; /* Remove absolute positioning */
  width: 40px;
  height: 40px;
  background: rgba(250, 250, 250, 0.5);
  border: 1.7px solid var(--color-background);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: var(--color-background);
  animation: float 3s ease-in-out infinite;
}

.transaction-item {
  flex: 0.95;
  display: flex;
  align-items: center;
  padding: 15px;
  background: rgba(250, 250, 250, 0.5);
  border: 1.7px solid var(--color-secondary-background);
  border-radius: 12px;
  animation: float 3.5s ease-in-out infinite;
}

.transaction-details {
  flex-grow: 1;
  margin-left: 10px;
  font-size: 10px;
  display: flex;
  justify-content: space-between;
}

.transaction-item p {
  margin: 0;
  font-size: 10px;}

.category-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  font-size: 20px;
}

.category-icon img {
  filter: brightness(0) saturate(100%) invert(100%);
  width: 25px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
}

.shopping {
  background-color: var(--color-charts);
}

.transport {
  background-color: var(--color-charts-secondary);
}

.date {
  font-size: 12px;
  color: #666;
}

.amount {
  font-weight: bold;
}


.balance-card {
  background: rgba(250, 250, 250, 0.5);
  border: 1.7px solid var(--color-secondary-background);
  padding: 20px;
  border-radius: 12px;
  margin: 15px 0;
  display: flex;
  flex-direction: row;
  animation: float 3s ease-in-out infinite;
}

.balance-left{
    text-align: left;
    flex: 0.6;
}

.balance-right {
  flex: 0.4;
  display: flex;
  align-items: center;
  justify-content: center;
}

.balance-right img {
  filter: brightness(0) saturate(100%) invert(100%);
  width: 120px;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.balance {
  font-size: 24px;
  font-weight: bold;
  margin: 10px 0;
}

.month-select {
  padding: 8px;
  border-radius: 8px;
  background: var(--color-background);
  border: 0.5px solid #2d2d2d;
  width: 110px;
  margin-top: 10px;
}

.row2 .transaction-item {
  animation-delay: 0.5s;
}

.row2 .add-circle {
  animation-delay: 0.5s;
}



@keyframes float {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-8px);
  }
  100% {
    transform: translateY(0px);
  }
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}



@media (prefers-color-scheme: dark) {

    .static-text {
    color: #2d2d2d !important;
  }

  .static-theme {
    background-color: #000000 !important;
    color: #ffffff !important;
  }

  .static-theme:hover {
    background-color: #ffffff !important;
    color: #000000 !important;
    border-color: #000000 !important;
  }
}


 </style>