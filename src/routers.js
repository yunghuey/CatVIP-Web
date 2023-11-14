// this router is like the bloc file in flutter, it will redirect which page to go
// import { def } from '@vue/shared';
import Home from "./components/Home.vue";
import Login from "./components/authentication/Login.vue";
import SignUp from "./components/authentication/SignUp.vue";
import {createRouter, createWebHashHistory} from 'vue-router';

const routes = [
    {
        name: 'Home',
        component: Home,
        path: '/'
    },
    {
        name: 'Login',
        component: Login,
        path: '/login'
    },
    {
        name: 'SignUp',
        component: SignUp,
        path: '/sign-up'
    }
];

const router = createRouter({
    history:createWebHashHistory(),
    routes
});

export default router;