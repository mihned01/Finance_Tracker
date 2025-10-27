<template>
    <mainDash>
      <!-- Dashboard specific content goes here -->
      <div class="dashboard-content">
        <h1>Dashboard</h1>
        <!-- Add your dashboard components, charts, statistics etc. -->
      </div>
    </mainDash>
  </template>
  
  <script setup>
  import mainDash from '@/components/mainDash.vue'
  </script>
  
  <style scoped>
 * {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
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
  width: 100vw; /* Add this */
  overflow: hidden;
  margin: 0; /* Add this */
  padding: 0; /* Add this */
}
  </style>