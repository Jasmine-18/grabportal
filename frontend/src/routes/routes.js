
import { createWebHistory, createRouter } from 'vue-router'
import Login from '../components/Login.vue'
import Dashboard from '../components/Dashboard.vue'
import History from '../components/History.vue'

const routes = [
  {
    path: '/',
    name: "Login",
    component: Login,
    meta: {
      hideNavbar: true,
    }
  },
  {
    path: '/dashboard',
    name: "Dashboard",
    component: Dashboard
  },
  {
    path: '/history',
    name: "History",
    component: History
  },

];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
