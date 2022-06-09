import { createWebHistory, createRouter } from 'vue-router'
import Login from '../components/Login.vue'
import Dashboard from '../components/Dashboard.vue'

const routes = [
    { path: '/', name: "Login", component: Login },
    { path: '/', name: "Dashboard", component: Dashboard }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;