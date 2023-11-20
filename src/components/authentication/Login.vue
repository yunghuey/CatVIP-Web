<template>
    <div class="container mt-2 pt-2" >
        <div class="row"><img class="logo mx-auto" src="../../assets/logo.png" alt=""></div>
        
        <div class="row text-center"><h1>CatViP</h1></div>

        <div class="row">
            <div class="col-12 col-sm-8 col-md-6 mx-auto">
                <div class="card border-0 shadow bg-light">
                    <div class="card-body">
                        <div class="row mx-auto"><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
                        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
                        </svg></div>

                        <input :class="{'error-sign': isUsernameError}" class="form-control my-2 border-3" type="text" v-model="username" placeholder="Enter username"/>
                        <span :class="{'text-danger': isUsernameError}">{{ usernameErrorMessage}}</span>
                        <input :class="{'error-sign': isPwdError}" class="form-control my-2 border-3" type="password" v-model="password" placeholder="Enter password"/>
                        <span :class="{'text-danger': isPwdError}">{{ pwdErrorMessage}}</span>

                        <div class="text-end"><router-link to="/forgotpassword" class="hyperlink">Forgot password?</router-link> </div>

                        <div class="text-center"><input type="submit" value="Sign In" class="btn" v-on:click="loginFunc"/></div>
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
import { EMPTY_ARR } from "@vue/shared";
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
                isUsernameError: false,
                usernameErrorMessage: '',
                isPwdError: false,
                pwdErrorMessage: '',
      
            }
        },
        methods: {
            async loginFunc() {
                console.log(this.username, this.password);
                if(!this.username && !this.password){
                    this.isUsernameError = true;
                    this.usernameErrorMessage = "Username must not be empty";
                    this.isPwdError = true;
                    this.pwdErrorMessage = "Password must not be empty";
                    return;
                }
                if(!this.username){
                    this.isUsernameError = true;
                    this.usernameErrorMessage = "Username must not be empty";
                    return;
                }
                if(!this.password){
                    this.isPwdError = true;
                    this.pwdErrorMessage = "Password must not be empty";
                    return;
                }
                try {
                    const result = await axios.post(ApiConstant.LoginURL, {
                        username: this.username.trim(),
                        password: this.password.trim(),
                        isMobileLogin: false
                    });
                    console.log("hello "+result.status); 
                    if (result.status === 200) {
                        console.log('sign in done');
                        localStorage.setItem("token", JSON.stringify(result.data));
                        this.$router.push({ name: 'Home' });
                    }
                } catch (error) {
                    this.isUsernameError = true;
                    this.isPwdError = true;
                    this.pwdErrorMessage = "Username or password is invalid";
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
.btn{
    color: var(--dark-color);
    background-color: var(--light-color);
}
.btn:hover{
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
.text-danger{
    color: rgb(163, 27, 27);
}
.error-sign{
    border: 1px solid rgb(196, 31, 31);
}
</style>