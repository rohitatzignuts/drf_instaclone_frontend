import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Register from '@/views/auth/Register.vue'
import Login from '@/views/auth/Login.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView,
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
  ],
})

router.beforeEach((to, from) => {
  const authToken = localStorage.getItem("authToken")
  const isAuthenticated = !!authToken
  if (!isAuthenticated && to.name !== 'Login' && to.name !== 'Register') {
    // Redirect unauthenticated user to the login page
    return { name: 'Login' };
  } else if (isAuthenticated && (to.name === 'Login' || to.name === 'Register')) {
    // Redirect authenticated user from login/register to the home page
    return { name: 'Home' };
  }
});

export default router
