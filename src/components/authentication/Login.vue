<template>
    <div class="container mt-2 pt-2" >
        <div class="row"><img class="logo mx-auto" src="../../assets/logo.png" alt=""></div>
        
        <div class="row text-center"><h1>CatViP</h1></div>

        <div class="row">
            <div class="col-12 col-sm-8 col-md-5 mx-auto">
                <div class="card border-0 shadow bg-light">
                    <div class="card-body">
                        <div class="row mx-auto"><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
                        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
                        </svg></div>

                        <input class="form-control my-2 border-3" type="text" v-model="username" placeholder="Enter username"/>
                        <input class="form-control my-2 border-3" type="password" v-model="password" placeholder="Enter password"/>
                        <div class="text-end"><router-link to="/sign-up" class="hyperlink">Forgot password?</router-link> </div>

                        <div class="text-center"><button class="btn" v-on:click="loginFunc">Sign In</button></div>
                    </div>
                </div>
            </div>
            
        </div>
        <div class="row">
            <div class="col-12 col-sm-8 col-md-6 m-auto text-center mt-2">
                <p><router-link to="/sign-up" class="hyperlink">Dont't have an account yet? Register here </router-link></p>
            </div>
        </div>
        
    </div>    
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
                });

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
            },
            
            // login username: admin, password: abc12345, isMobileLogin: false
        },
        mounted(){
            let user = localStorage.getItem('token');
            if (user){
                this.$router.push({name:'Home'});
            }
        },
        
    }
</script>

<style scoped>
svg{
    color:var(--gold-neutral-color);
}
img.logo{
    width: 150px;
}
button{
    color: var(--dark-color);
    background-color: var(--light-color);
}
button:hover{
    border: 1px solid var(--dark-color);
    color: #FFF;
    background-color: var(--gold-neutral-color);
}
.hyperlink{
    text-decoration: none;
    color: var(--dark-color);
}
.hyperlink:hover{
    text-decoration: underline;
}
input[type="text"]:focus,
input[type="password"]:focus{
    border: none;
    box-shadow: 0 0 0 0.2rem rgba(189,153,87, 0.8);
}
</style>