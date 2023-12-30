// this router is like the bloc file in flutter, it will redirect which page to go
import Home from "./components/admin/Home.vue";
import Login from "./components/authentication/Login.vue";
import SignUp from "./components/authentication/SignUp.vue";
import ForgotPassword from "./components/authentication/ForgotPassword.vue";
import EditProfile from "./components/authentication/EditProfile.vue";
import ExpertView from "./components/admin/expert/ExpertView.vue";
import ExpertForm from "./components/admin/expert/ExpertForm.vue";
import ExpertPending from "./components/admin/expert/ExpertPending.vue";
import ReportedPosts from "./components/admin/post/ReportedPosts.vue";
import ReviewPost from "./components/admin/post/ReviewPost.vue";
import SellerHome from "./components/seller/sellerhome.vue";
import ProductList from "./components/seller/ProductList.vue";
import AddProduct from "./components/seller/AddProduct.vue";
import EditProduct from "./components/seller/EditProduct.vue";
import { createRouter, createWebHashHistory } from 'vue-router';

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
    },
    {
        name: 'ExpertPending',
        component: ExpertPending,
        path: '/expert/pending',

    },
    {
        name: 'ReportedPosts',
        component: ReportedPosts,
        path: '/post/reportedposts'
    },
    {
        name: 'Seller',
        component: SellerHome,
        path: '/seller'
    },
    {
        name: 'EditProfile',
        component: EditProfile,
        path: '/editprofile'
    },
    {
        name: 'ReviewPost',
        component: ReviewPost,
        path: '/post/reviewpost/:id',
        props: true
    },
    {
        name: 'ProductList',
        component: ProductList,
        path: '/seller/products'
    },
    {
        name: 'AddProduct',
        component: AddProduct,
        path: '/seller/addProduct'
    },
    {
        name: 'EditProduct',
        component: EditProduct,
        path: '/seller/editProduct/:id'
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

export default router;
