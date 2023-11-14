<template>
    <img class="logo" src="../../assets/logo.png" alt="">
    <h1>CatViP</h1>
    <div class="login">
        <input type="text" v-model="username" placeholder="Enter username"/>
        <input type="password" v-model="password" placeholder="Enter password"/>
        <button v-on:click="loginFunc">Sign In</button>
    </div>
    <p>
        <router-link to="/sign-up">Dont't have an account yet? Register here </router-link>
    </p>
</template>

<script>
import { ApiConstant } from "../../repository/APIConstant.js"
import axios from 'axios';
export default
{
    // name can put same as filename -- name of component
    name:'Login',
    data()
    {
        return {
            username: '',
            password: '',
        }
    },
    methods: {
        async loginFunc() {
        console.log(this.username, this.password);
        try {
            const result = await axios.post(ApiConstant.LoginURL, {
                username: this.username,
                password: this.password,
                isMobileLogin: false
                },
                {headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
                    'Access-Control-Allow-Headers':  'Origin,Content-Type,X-Requested-With,Accept,Authorization'
                }}
            );

            if (result.status === 200) {
            console.log('sign in done');
            localStorage.setItem("token", JSON.stringify(result.data));
            this.$router.push({ name: 'Home' });
            } else {
            console.error('Unexpected response:', result);
            alert('Invalid Login');
            }
        } catch (error) {
            console.error('Error in login', error);
            alert('An error occurred during login. Please try again.');
        }
    }
        // login username: admin, password: abc12345, isMobileLogin: false
    }
}
</script>

<style>
img.logo{
    width: 200px;
}
</style>