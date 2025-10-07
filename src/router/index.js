import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import { useAuth } from '@/modules/useAuth.js'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },

    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },

    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },

    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/DashboardView.vue'),
      meta: { requiresAuth: true } //this route requires authentication
    },
    // router.beforeEach((to, from, next) => {
    //   //destructure the isLoggedIn property from useAuth
    //   const {isLoggedIn} = useAuth()
    //   if (to.meta.requiresAuth && !isLoggedIn.value) {
    //     next({name: 'login'}) //redirect to login page if not logged in
    //   } else {
    //     next()
    //   }
    // })

    {
      path: '/transactions',
      name: 'transactions',
      component: () => import('../views/TransactionsView.vue'),
      meta: { requiresAuth: true } 
    },

    {
      path: '/categories',
      name: 'categories',
      component: () => import('../views/CategoriesView.vue'),
      meta: { requiresAuth: true } 
    },

    {
      path: '/statistics',
      name: 'statistics',
      component: () => import('../views/StatisticsView.vue'),
      meta: { requiresAuth: true } 
    },

    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/ProfileView.vue'),
      meta: { requiresAuth: true } 
    },
  ],
})

export default router