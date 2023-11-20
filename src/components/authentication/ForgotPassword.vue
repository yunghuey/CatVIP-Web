<template>
    <div class="container mt-4 pt-2" style="width: 80%;">
        <div class="row mx-auto">
            <div class="col-2"><img class="logo mx-auto" src="../../assets/logo.png" alt=""></div>
        </div>
        <div class="row mx-auto text-center">
            <div class="col-5 my-auto col-sm-8 col-xs-12"><h3>Forgot password</h3></div>
        </div>
        <div class="row my-2">
            <div class="col-5" :class="{'alert alert-success' : sentSuccess}" role="alert">
                {{ sentEmailMessage }}
            </div>
        </div>
        <div class="row my-2">
            <div class="col-8 col-sm-6">
                <label for="emailadd" class="form-label">Email address</label>
                <input type="email" class="form-control" :class="{'error-sign': isEmailError}" id="emailadd" placeholder="Enter email address" v-model="email">
            </div>
        </div>
        <div class="row my-2">
            <div class="col-8 col-sm-6">
                <span :class="{'text-danger': isEmailError}">{{ emailErrorMessage}}</span>
            </div>
        </div>
        <div class="row my-2">
            <div class="col-sm-6 col-md-8 text-center">
                <button class="btn" v-on:click="sendEmail">Send</button>
                <button class="btn"><router-link to="/login" class="hyperlink">Back to login</router-link></button>
            </div>

        </div>
    </div>

</template>

<script>
import axios from 'axios';
import { ApiConstant } from "../../repository/APIConstant.js";

export default {
    name: 'ForgotPassword',
    data(){
        return {
            email: '',
            isEmailError: false,
            emailErrorMessage: '',
            sentSuccess: false,
            sentEmailMessage: '',
        }
    },
    methods:{
        async sendEmail(){
            this.isEmailError = false;
            this.emailErrorMessage = '';
            // null validation
            if(!this.email){
                this.isEmailError = true;
                this.emailErrorMessage = "Please fill up email";
                return;
            }
            // format validation
            if(!/\S+@\S+\.\S+/.test(this.email)){
                this.isEmailError = true;
                this.emailErrorMessage += "Email must be in complete format\n";
                return;
            }
            this.email = this.email.trim();
            const params =  { email: this.email };
            console.log(params);
            try{
                let result = await axios.post(ApiConstant.ForgotPasswordURL,null, {params: params,});
                if(result.status === 200){
                    this.sentSuccess = true;
                    this.sentEmailMessage = "Email has been sent, please check your email to reset password";
                    this.email = "";
                }
            } catch (error){
                if(error.response && error.response.status === 400){
                    this.isEmailError = true;
                    this.emailErrorMessage = error.response.data;
                }
            }
        }
    },

}
</script>

<style scoped>
img.logo{
    width: 150px;
}
.error-sign{
    border: 3px solid rgb(196, 31, 31);
}
.btn{
    color: var(--dark-color);
    background-color: var(--light-color);
}
.hyperlink{
    text-decoration: none;
    color: var(--dark-color);
}
.hyperlink:hover{
    color: #FFF;
}
input[type="email"]:focus{
    border: none;
    box-shadow: 0 0 0 0.2rem rgba(189,153,87, 0.8);
}
.row{
    justify-content: center;
    /* border: 1px solid black; */
}
button{
    /* width: 100px; */
    color: var(--dark-color);
    background-color: var(--light-color);
    border: 1px solid var(--dark-color);
    margin: 8px;
}
button:hover{
    border: 1px solid var(--dark-color);
    color: #FFF;
    background-color: var(--gold-neutral-color);
}
</style>