// this router is like the bloc file in flutter, it will redirect which page to go
import Home from "./components/admin/Home.vue";
import Login from "./components/authentication/Login.vue";
import SignUp from "./components/authentication/SignUp.vue";
import ForgotPassword from "./components/authentication/ForgotPassword.vue";
import ExpertView from "./components/admin/expert/ExpertView.vue";
import ExpertForm from  "./components/admin/expert/ExpertForm.vue";
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
    },
    {
        name: 'ForgotPassword',
        component: ForgotPassword,
        path: '/forgotpassword'
    },
    {
        name: 'Expert',
        component: ExpertView,
        path: '/expert/view'
    },
    {
        name: 'ExpertForm',
        component: ExpertForm,
        path: '/expert/form/:id'
    }

];

const router = createRouter({
    history:createWebHashHistory(),
    routes
});

export default router;