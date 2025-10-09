<script setup>
import { RouterLink, RouterView, useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <header v-if="route.path === '/'">
    <div class="nav-bar">

      <p>MoneyMate</p>

      <!-- <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav> -->

      <button>Login</button> 
    </div>

  </header>
  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.3;
  max-height: 100vh;
  margin:10px 40px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
}

/* nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
} */


.nav-bar {
     width: 100%;
     display: flex;
     flex-direction: row;
     align-items: center;
     align-content:space-between;
     justify-content: space-between;
 }
 
 .nav-bar p {
     font-size: 24px;
     font-weight: bold;
     color: var(--color-text);
 }

 .nav-bar a {
  text-decoration: none;
  font-size: 18px;
  color: var(--color-text);
  transition: 0.4s;
  padding: 5px;
 }

 .nav-bar button {
     padding: 10px 20px;
     background-color: var(--color-button);
     color: var(--color-background);
     border: 1.5px solid transparent;
     border-radius: 8px;
     font-size: 14px;
     cursor: pointer;
     transition: all 0.3s ease;
 }

 .nav-bar button:hover {
    background-color: var(--color-background);
    color: var(--color-button);
    border: 1.5px solid var(--color-button);
} 



@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
