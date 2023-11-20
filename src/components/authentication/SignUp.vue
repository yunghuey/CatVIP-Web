<template>

    <div class="container mt-2 pt-2" style="width: 80%;">
        <div class="row mx-auto">
            <div class="col-2"><img class="logo mx-auto" src="../../assets/logo.png" alt=""></div>
        </div>
        <div class="row mx-auto text-center">
            <div class="col-5 my-auto col-sm-8 col-xs-12"><h3>Create an account as seller</h3></div>
        </div>
        <div class="row my-2">
            <div class="col-5 col-sm-4">
                <label for="username" class="form-label">Username *</label>
                <input type="text" class="form-control" :class="{'error-sign': isUsernameError}" id="username" placeholder="Enter username" v-model="username">
            </div>
            <div class="col-5 col-sm-4">
                <label for="fullname" class="form-label">Full name *</label>
                <input type="text" class="form-control" id="fullname"  placeholder="Enter full name" v-model="fullname">
            </div>
        </div>
        <div class="row my-2">
            <div class="col-5 col-sm-4">
                <label for="emailadd" class="form-label">Email address *</label>
                <input type="email" class="form-control" :class="{'error-sign': isEmailError}" id="emailadd" placeholder="Enter email address" v-model="email">
            </div>
            <div class="col-5 col-sm-4">
                <label for="birthday" class="form-label">Date of Birth *</label>
                <input type="date" class="form-control" :class="{'error-sign': isDobError}" id="birthday" name="birthday" :max="maxBirthday" v-model="dob">
            </div>
        </div>

        <div class="row my-2">
            <div class="col-5 col-sm-4">
                <label for="password" class="form-label">Password (minimum 8 characters)*</label>
                <input type="password" id="password" class="form-control" placeholder="Enter password"  v-model="password">
            </div>
            <div class="col-5 col-sm-4">
                <label for="confirmpassword" class="form-label">Confirm password *</label>
                <input type="password" id="confirmpassword" class="form-control" placeholder="Confirm password" v-model="confirmpwd">
            </div>
        </div>
        <div class="row my-2">
            <div class="col-2">
                <label for="gender" class="form-label">Gender *</label>
            </div>
            <div class="form-check col-3">
                <input class="form-check-input" type="radio" name="gender" id="male-gender" value="true" v-model="gender">
                <label class="form-check-label" for="male-gender">Male </label>
            </div>
            <div class="form-check col-3">
                <input class="form-check-input" type="radio" name="gender" id="female-gender" value="false" v-model="gender">
                <label class="form-check-label" for="female-gender">Female</label>
            </div>
        </div>
        <div class="row my-2">
            <div class="col-8">
                <span :class="{'text-danger': hasError}" style="white-space: pre-line">{{ errorMessage}}</span>
            </div>
        </div>
        <div class="row my-2">
            <div class="col-sm-6 col-md-8 text-center">
                <button class="btn" v-on:click="signUp">Sign Up</button>
            </div>
        </div>
        <div class="row">
            <div class="col-4">
                <router-link to="/login" class="hyperlink">Already have an account? Sign in here </router-link>
            </div>
        </div>   
</div>
</template>

<script>
import { ApiConstant } from "../../repository/APIConstant.js";
import { registerRuntimeHelpers } from '@vue/compiler-core';
import axios from 'axios';

export default {
    name: 'SignUp',
    data(){
        return{
            selectedDate: '',
            username: '',
            email: '',
            password: '',
            confirmpwd: '',
            dob: '',
            fullname: '',
            gender: '',
            errorMessage: '',
            hasError: false,
            isUsernameError: false,
            isEmailError: false,
            isDobError: false,
        }
    },
    methods:{
        calculateAge(dob){
            const currentDate = new Date();
            const birthdate = new Date(dob);
            let age = currentDate.getFullYear() - birthdate.getFullYear();

            const hasbirthdayoccurred = (
                currentDate.getMonth() > birthdate.getMonth() || 
                (currentDate.getMonth() === birthDate.getMonth() && currentDate.getDate() >= birthDate.getDate())
            );
            if (!hasbirthdayoccurred){
                age--;
            }
            return age;
        },
        async signUp(){
            this.errorMessage = "";
            this.hasError = false;
            this.isEmailError = false;
            this.isUsernameError = false;
            this.isDobError = false;

            // null validation
            if(!this.username || !this.email || !this.password || !this.confirmpwd || !this.dob || !this.fullname || !this.gender){
                this.hasError = true;
                this.errorMessage = "Please fill up all the information\n";
                return;
            }  
            // username validation
            if(/\s/.test(this.username.trim())){
                this.hasError = true;
                this.errorMessage += "Username cannot contain space\n";
            }
            // email validation
            if(!/\S+@\S+\.\S+/.test(this.email)){
                this.hasError = true;
                this.errorMessage += "Email must be complete\n";
            }
            // dob validation
            const age = this.calculateAge(this.dob);
            if(age < 18){
                this.hasError = true;
                this.errorMessage += "You must be at least 18 years old to sign up\n";
                this.isDobError = true;
            }
            // password validation
            if (this.password !== this.confirmpwd){
                this.hasError = true;
                this.errorMessage += "Password does not match\n";
            }
            if(this.password.length < 8){
                this.hasError = true;
                this.errorMessage += "Password must be at least 8 characters\n";
            }
            if (this.errorMessage != ''){
                return;
            }
            try{
                var body  = {
                    username: this.username.trim(),
                    fullName: this.fullname.trim(),
                    email: this.email.trim(),
                    password: this.password.trim(),
                    dateOfBirth: this.dob,
                    gender: JSON.parse(this.gender.toLowerCase()),
                    roleId: 4
                };
                console.log(body);
                let result = await axios.post(ApiConstant.RegisterURL, body);
                if(result.status == 200){
                    localStorage.setItem("token", JSON.stringify(result.data));
                    this.$router.push({ name: 'Home' });
                } else{
                    console.log(result.data);
                    alert('Invalid sign up');
                }

            } catch (error){
                console.error('Error in sign up', error);

                if (error.response && error.response.status === 409) {
                    console.error(error.response.data);
                    this.hasError = true;
                    this.errorMessage = error.response.data;
                    // highlight input field
                    if(error.response.data[0] == 'U'){
                        this.isUsernameError = true;
                    } else {
                        this.isEmailError = true;
                    }
                } else {
                    alert('An error occurred during sign up. Please try again.');
                }
            }
            
        }
    },
    computed: {
        maxBirthday(){
            const currentDate = new Date();
            const maxDate = new Date(currentDate.getFullYear() - 18, currentDate.getMonth(), currentDate.getDate());
            const formattedMaxDate = maxDate.toISOString().split('T')[0];
            return formattedMaxDate;
        }
    },
    mounted(){
        let user = localStorage.getItem('token');
        if (user){
            this.$router.push({name:'Home'})
        }
    }
}
</script>

<style scoped>
img.logo{
    width: 120px;
}
button{
    width: 200px;
    color: var(--dark-color);
    background-color: var(--light-color);
    border: 1px solid var(--dark-color);
}
button:hover{
    border: 1px solid var(--dark-color);
    color: #FFF;
    background-color: var(--gold-neutral-color);
}
.hyperlink{
    text-decoration: none;
    color: #3c1e08;
}
.hyperlink:hover{
    text-decoration: underline;
}
input[type="text"]:focus,
input[type="password"]:focus,
input[type="date"]:focus{
    border: none;
    box-shadow: 0 0 0 0.2rem rgba(189,153,87, 0.8);
}
.row{
    justify-content: center;
    /* border: 1px solid black; */
}
input[type='radio']:after {
    width: 17px;
    height: 17px;
    border-radius: 15px;
    top: -3px;
    left: -1px;
    position: relative;
    background-color: #d1d3d1;
    content: '';
    display: inline-block;
    visibility: visible;
    border: 2px solid white;
}

input[type='radio']:checked:after {
    width: 17px;
    height: 17px;
    border-radius: 15px;
    top: -3px;
    left: -1px;
    position: relative;
    background-color: var(--gold-neutral-color);
    content: '';
    display: inline-block;
    visibility: visible;
    border: 2px solid white;
}
.error-sign{
    border: 3px solid rgb(196, 31, 31);
}
</style>