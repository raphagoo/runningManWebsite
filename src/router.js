import Vue from 'vue';
import Router from 'vue-router';

import Home from './views/Home.vue';
import Login from "./views/Login.vue";
import userRaces from './components/userRaces.vue';

Vue.use(Router);

export const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/races',
            name: 'races',
            component: Home
        },
        {
            path: '/users',
            name: 'users',
            component: Home
        },
        { 
            name: 'userRaces',
            path: '/user/:id/races',
            component: userRaces 
        },
        {
            path: '*',
            redirect: '/',
        },
    ]
})

router.beforeEach((to, from, next) => {

    // redirect to login page if not logged in and trying to access a restricted page
    const publicPages = ['/login', '/register'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = sessionStorage.getItem('token');

    if (authRequired && !loggedIn) {
        return next('/login');
    }

    next();
});
