import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/Home.vue';
import Login from '../components/Login.vue';
import Pokemon from '../components/Pokemon.vue';
import Profile from '../components/Profile.vue';

const routes = [
    { path: '/', component: Home },
    { path: '/login', component: Login },
    { path: '/pokemon', component: Pokemon },
    {
        path: '/profile',
        component: Profile,
        meta: { requiresAuth: true }
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
        if (!isAuthenticated) {
            next('/login');
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router;