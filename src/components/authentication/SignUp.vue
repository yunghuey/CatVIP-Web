<template>
    <h1>Sign Up</h1>
    <img class="logo" src="../../assets/logo.png" alt="">
    <h3>Create an account as seller</h3>
    <div class="register">
        <!-- not completed yet, UI purpose first -->
        <div class="form-control">
            <!-- <label for="username">Username</label> -->
            <input type="text" id="username" placeholder="Enter username">
        </div>
        <div class="form-control">
            <input type="text" placeholder="Enter full name">

        </div>
        <div class="form-control">
            <input type="text" placeholder="Enter email address">

        </div>
        <div class="form-control">
            <input type="password" placeholder="Enter password">

        </div>
        <div class="form-control">
            <input type="password" placeholder="Confirm password">

        </div>
        <div class="form-control">
            <input type="radio" id="male-gender" name="gender" value="male">
            <label for="male-gender">Male</label>
            <input type="radio" id="female-gender" name="gender" value="female" v-model="selectedDate">
        <label for="male-gender">Female</label>
        </div>
        <div class="form-control">
            <label for="birthday">Birthday:</label>
            <input type="date" id="birthday" name="birthday" :max="maxBirthday">
        </div>  
       
        <button class="form-control">Sign Up</button>
        <router-link to="/login">Already have an account? Sign in here </router-link>
   </div>
</template>

<script>
export default {
    name: 'SignUp',
    data(){
        return{
            selectedDate: '',
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

<style>
img.logo{
    width: 200px;
}

.form-control {
    width: 200px;
    height: 40px;
    padding: 10px 20px;
    margin-left: auto;
    margin-right: auto;
    display: flex;
}
.form-control input{
    border: 1px solid skyblue;

}
.register button{
    width: 320px;
    height: 40px;
    border: 2px solid skyblue;
    border-radius: 20px;
    background: skyblue;
    color: black;
    text-align: center;
}
</style>