
import { createWebHistory, createRouter } from 'vue-router'
import Login from '../components/Login.vue'
import Dashboard from '../components/Dashboard.vue'
import History from '../components/History.vue'
import DeniedAccess from '../components/DeniedAccess.vue'

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
    component: Dashboard,
  },
  {
    path: '/history',
    name: "History",
    component: History,
  },
  {
    path: '/deniedAccess',
    name: "Denied Access",
    component: DeniedAccess,
    meta: {
      hideNavbar: true,
    }
  },

];
const router = createRouter({
  history: createWebHistory(),
  routes,
});


export default router;
