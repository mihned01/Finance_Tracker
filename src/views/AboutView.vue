<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>


<script setup>
import { ref } from 'vue';
import { onMounted } from 'vue';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCxEyCSuCqo0h5qnYvwGVoASeOvl65h8Fs",
  authDomain: "finance-tracker-ca070.firebaseapp.com",
  projectId: "finance-tracker-ca070",
  storageBucket: "finance-tracker-ca070.firebasestorage.app",
  messagingSenderId: "428063726629",
  appId: "1:428063726629:web:a28ea871c0134171a073cc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
</script>



<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
