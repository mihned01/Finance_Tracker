<template>
  <main class="container">
    <section class="hero-section">
      <div class="hero-container">
        <div class="hero">
          <div class="hero-left">
            <h1 class="static-text">Manage your personal finances smart & simple</h1>
            <p class="static-text">Track spending, manage budgets, and grow your savings — all in one place with
              MoneyMate.</p>
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
                  <h2>Total Balance:</h2>
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
      </div>
    </section>

    <section class="process-section">
      <h2>Simple process to manage you personal finance</h2>

      <div class="steps-section">
        <div class="step">
          <div class="step-one">
            <img src="@/assets/icons/user-plus-solid-full.svg" alt="Create account">
          </div>
          <p>Create an account</p>
        </div>
        <div class="connector"></div>
        <div class="step">
          <div class="step-two">
            <img src="@/assets/icons/chart-simple-solid-full.svg" alt="Save transaction">
          </div>
          <p>Save Transaction</p>
        </div>
        <div class="connector"></div>
        <div class="step">
          <div class="step-three">
            <img src="@/assets/icons/chart-line-solid-full.svg" alt="Track finance">
          </div>
          <p>Track Finance</p>
        </div>
      </div>

    </section>

    <section class="features-section">
      <h2>Take control of your money</h2>
      <p>Track spending, manage budgets, and achieve your financial goals—all within MoneyMate.</p>
      <div class="features-container">
        <div class="feature-box">
          <div class="feature-box-top">
            <h3>Smart Transaction Logging</h3>
            <p>Log expenses in seconds. Quickly add and categorize your transactions on the go. Attach notes, dates, and
              amounts instantly so nothing slips through the cracks.</p>
          </div>
          <div class="feature-box-bottom">
            <img src="@/assets/icons/feature3.png" alt="chart example">
          </div>
        </div>
        <div class="feature-box">
          <div class="feature-box-top">
            <h3>Powerful Category Tracking</h3>
            <p>See exactly where your money goes. Use pre-set categories (like Groceries, Transport, Bills) or create
              your own to organize spending and identify areas for improvement.</p>
          </div>
          <div class="feature-box-bottom">
            <img src="@/assets/icons/feature2.png" alt="categorized expenses example">
          </div>
        </div>
        <div class="feature-box">
          <div class="feature-box-top">
            <h3>Visual Analytics & Insights</h3>
            <p>Stop guessing. Start knowing. Get clear, visual reports on your spending habits over time. Check monthly
              summaries and statistics to make informed financial decisions.</p>
          </div>
          <div class="feature-box-bottom">
            <img src="@/assets/icons/feature3.png" alt="chart example">
          </div>
        </div>
      </div>
    </section>


    <section class="security-section">
      <h2>Your Data, Your Control</h2>
      <p>We prioritize simplicity and privacy, ensuring you have full access to your financial records and no one else.
      </p>

      <div class="security-top">
        <div class="security-top-left">
          <div class="security-top-left-text">
            <h3>Private Account Acess</h3>
            <p>Your data is accessed only through your unique login credentials, ensuring your transactions and balance
              remain private to you.</p>
          </div>
          <div class="security-top-left-icon">
            <img src="@/assets/icons/locket.png" alt="security icon">
          </div>
        </div>

        <div class="security-top-right">
          <div class="security-top-right-text">
            <h3>Separated Data Environment</h3>
            <p>Your tracking data is kept in a separate, dedicated environment and is not shared with any external
              financial institutions or third parties.</p>
          </div>
          <div class="security-top-right-icon">
            <img src="@/assets/icons/database-green.png" alt="security icon">
          </div>
        </div>
      </div>

      <div class="security-bottom">
        <div class="security-bottom-left">
          <div class="security-bottom-left-text">
            <h3>Full Transaction Control</h3>
            <p>You have the power to manage your history. Easily edit or delete any transaction record at any time,
              ensuring your financial overview is always accurate.</p>
          </div>
          <div class="security-bottom-left-icon">
            <img src="@/assets/icons/pencil-green.png" alt="security icon">
          </div>
        </div>

        <div class="security-bottom-right">
          <div class="security-bottom-right-text">
            <h3>No Banking Credentials Stored</h3>
            <p>MoneyMate is a finance tracker, not a bank. We never ask for or store sensitive banking passwords or full
              credit card numbers.</p>
          </div>
          <div class="security-bottom-right-icon">
            <img src="@/assets/icons/sheld-half-white.png" alt="security icon">
          </div>
        </div>
      </div>
    </section>

    <footer class="footer-section">
      <p>© MoneyMate 2025</p>
    </footer>

  </main>
</template>



<script setup>
import { useRouter } from 'vue-router'
import { waapi, utils, stagger, spring } from 'animejs'
import { onMounted } from 'vue'

const router = useRouter()


const navigateToLogin = () => {
  router.push('/login')
}



waapi.animate('.connector', {
  y: [0, -30, 0],
  ease: spring({ stiffness: 150, damping: 5 }),
  delay: stagger(75),
  loop: true,
});



</script>



<style scoped>
.container {
  width: 100%;
  height: fit-content;
  background-color: #fafafa;
}

.hero-container {
  height: 75vh;
  margin: 10px 40px 10px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fafafa;
}

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
  font-family: "Poppins", sans-serif;
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
  padding: 12px 25px;
  margin: 10px 0;
  background-color: var(--color-button);
  color: var(--color-background);
  border: 1.5px solid transparent;
  border-radius: 8px;
  font-size: 16px;
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
  font-size: 10px;
}

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

.balance-left {
  text-align: left;
  flex: 0.6;
}

.balance-left h2 {
  font-size: 24px;
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  color: var(--color-text);
}

.balance-left p {
  font-size: 16px;
  font-family: "Poppins", sans-serif;
  color: var(--color-text);
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

/* PROCESS SECTION */
.process-section {
  height: fit-content;
  margin: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--color-background);
}

.process-section h2 {
  font-size: 32px;
  font-family: "Poppins", sans-serif;
  font-weight: bold;
  color: var(--color-text);
  text-align: center;
  margin-bottom: 20px;
}

.steps-section {
  width: 80%;
  margin: 40px 0 40px 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.step {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.step-one,
.step-two,
.step-three {
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  width: 90%;
  height: 130px;
  border-radius: 8px;
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.step-one img,
.step-two img,
.step-three img {
  width: 50%;
  height: 150px;
  filter: brightness(0) saturate(100%) invert(100%);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.step p {
  font-size: 18px;
  font-family: Poppins, sans-serif;
  font-weight: 500;
  color: var(--color-text);
  text-align: center;
}

.step-one {
  background-color: var(--color-charts);
}

.step-two {
  background-color: var(--color-charts-secondary);
}

.step-three {
  background-color: var(--color-charts-three);
}

.connector {
  flex: 1;
  height: 2px;
  background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3cline x1='0' y1='0' x2='100%25' y2='0' stroke='%23666666' stroke-width='2' stroke-dasharray='8%2c8'/%3e%3c/svg%3e");
  max-width: 150px;
  position: relative;
  z-index: 1;
}

/* FEATURES SECTION */
.features-section {
  height: fit-content;
  margin: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--color-background);
}

.features-section h2 {
  font-size: 32px;
  font-family: "Poppins", sans-serif;
  font-weight: bold;
  color: var(--color-text);
  text-align: center;
}

.features-section p {
  font-size: 18px;
  font-family: "Poppins", sans-serif;
  color: var(--color-text);
  width: 60%;
  text-align: center;
  margin-bottom: 40px;
}

.features-container {
  display: flex;
  color: var(--color-background);
  justify-content: space-between;
  align-items: stretch;
  margin: 0 0 40px 0;

}
/* Add this hover effect for feature boxes */
.feature-box:hover {
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.12);
  transform: scale(1.01);
}

/* You can also remove the JavaScript hover effects since CSS handles it better */
.feature-box {
  background: rgba(128, 255, 206, 0.5);
  border: 0.1px solid #2d2d2d;
  border-radius: 8px;
  width: 30%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.3s ease, box-shadow 0.3s ease; /* Add this transition */
}

.feature-box-top {
  padding: 30px 30px 0 30px;
}

.feature-box-top h3 {
  font-size: 20px;
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 15px;
}

.feature-box-top p {
  width: 100%;
  font-size: 16px;
  font-family: "Poppins", sans-serif;
  text-align: start;
  color: var(--color-text);
  font-weight: 400;
  line-height: 1.5;
}

.feature-box-bottom {
  padding: 0 30px 30px 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
}

.feature-box-bottom img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}



/* SECURITY SECTION */
.security-section {
  height: fit-content;
  margin: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

}

.security-section h2 {
  font-size: 32px;
  font-family: 'Poppins', sans-serif;
  font-weight: bold;
  color: var(--color-text);
  text-align: center;
}

.security-section p {
  font-size: 18px;
  font-family: 'Poppins', sans-serif;
  color: var(--color-text);
  width: 60%;
  text-align: center;
  margin-bottom: 40px;
}

.security-top,
.security-bottom {
  width: 100%;
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

/* SECUTITY CARDS */

/* TOP */
.security-top-left {
  height: 250px;
  flex: 1.1;
  background: var(--color-main);
  border: 0.1px solid #2d2d2d;
  border-radius: 8px;
  display: flex;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.security-top-left-text {
  width: 65%;
  margin: 30px 0 30px 30px;
  justify-content: flex-start;

}

.security-top-left-text h3 {
  font-size: 20px;
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 15px;
}

.security-top-left-text p {
  width: 100%;
  font-size: 16px;
  font-family: 'Poppins', sans-serif;
  text-align: start;
  color: var(--color-text);
  font-weight: 400;
  line-height: 1.5;
}

.security-top-left-icon {
  width: 35%;
  margin: 30px 30px 30px 0;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
}

.security-top-left-icon img {
  width: 50%;
  height: 65%;
  filter: brightness(0) saturate(100%) invert(100%);
}


.security-top-right {
  height: 250px;
  flex: 0.9;
  background: var(--color-background);
  border: 0.1px solid #2d2d2d;
  border-radius: 8px;
  display: flex;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.security-top-right-text {
  width: 65%;
  margin: 30px 0 30px 30px;
  justify-content: flex-start;
}

.security-top-right-text h3 {
  font-size: 20px;
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 15px;
}

.security-top-right-text p {
  width: 100%;
  font-size: 16px;
  font-family: 'Poppins', sans-serif;
  text-align: start;
  color: var(--color-text);
  font-weight: 400;
  line-height: 1.5;
}

.security-top-right-icon {
  width: 35%;
  margin: 30px 30px 30px 0;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
}

.security-top-right-icon img {
  width: 60%;
  height: 60%;
}

/* BOTTOM */
.security-bottom-left {
  height: 250px;
  flex: 0.9;
  background: var(--color-backgorund);
  border: 0.1px solid #2d2d2d;
  border-radius: 8px;
  display: flex;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.security-bottom-left-text {
  width: 65%;
  margin: 30px 0 30px 30px;
  justify-content: flex-start;
}

.security-bottom-left-text h3 {
  font-size: 20px;
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 15px;
}

.security-bottom-left-text p {
  width: 100%;
  font-size: 16px;
  font-family: 'Poppins', sans-serif;
  text-align: start;
  color: var(--color-text);
  font-weight: 400;
  line-height: 1.5;
}

.security-bottom-left-icon {
  width: 35%;
  margin: 30px 30px 30px 0;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
}

.security-bottom-left-icon img {
  width: 70%;
  height: 60%;
}

.security-bottom-right {
  height: 250px;
  flex: 1.1;
  background: rgba(128, 255, 206, 0.5);
  border: 0.1px solid #2d2d2d;
  border-radius: 8px;
  display: flex;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.security-bottom-right-text {
  width: 65%;
  margin: 30px 0 30px 30px;
  justify-content: flex-start;
}

.security-bottom-right-text h3 {
  font-size: 20px;
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 15px;
}

.security-bottom-right-text p {
  width: 100%;
  font-size: 16px;
  font-family: 'Poppins', sans-serif;
  text-align: start;
  color: var(--color-text);
  font-weight: 400;
  line-height: 1.5;
}

.security-bottom-right-icon {
  width: 35%;
  margin: 30px 30px 30px 0;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
}

.security-bottom-right-icon img {
  width: 55%;
  height: 60%;
}


/* Add hover effects */
.security-top-left:hover,
.security-top-right:hover,
.security-bottom-left:hover,
.security-bottom-right:hover {
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.12);
  transform: scale(1.01);

}

/* FOOTER SECTION */
.footer-section {
  background-color: var(--color-main);
  padding: 30px 0;
  margin: 0;
  margin-top: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  margin-left: calc(-50vw + 50%);
}

.footer-section p {
  font-family: 'Poppins', sans-serif;
  font-size: 16px;
  font-weight: 500;
  color: var(--color-text);
  margin: 0;
  text-align: center;
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