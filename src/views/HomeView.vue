<template>
  <main class="hero-container">
     <div class="hero">
         <div class="hero-left">
             <h1>Manage your personal finances smart & simple</h1>
             <p>Track spending, manage budgets, and grow your savings — all in one place with MoneyMate.</p>
             <button>Register</button>
         </div>
         <div class="hero-right"></div>
     </div>
  </main>
 
 
 
 </template>
 
 
 
 <script>
 
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
     height: 60vh;
     display: flex;
     align-items: center;
     justify-content: space-between;
     padding: 0 5%;
     background-color: #80FFCE;
     border-radius: 20px
 }

 .hero-left {
     width: 42%;
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

 </style>