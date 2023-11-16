<template>

    <div class="container mt-2 pt-2" style="width: 80%;">
        <div class="row mx-auto">
            <div class="col-2"><img class="logo mx-auto" src="../../assets/logo.png" alt=""></div>
            <div class="col-5 my-auto"><h3>Create an account as seller</h3></div>
        </div>
        <div class="row my-2">
            <div class="col-5 col-sm-4">
                <label for="username" class="form-label">Username</label>
                <input type="text" class="form-control"  id="username" placeholder="Enter username">
            </div>
            <div class="col-5 col-sm-4">
                <label for="fullname" class="form-label">Full name</label>
                <input type="text" class="form-control" id="fullname"  placeholder="Enter full name">
            </div>
        </div>
        <div class="row my-2">
            <div class="col-5 col-sm-4">
                <label for="emailadd" class="form-label">Email address</label>
                <input type="email" class="form-control" id="emailadd" placeholder="Enter email address">
            </div>
            <div class="col-5 col-sm-4">
                <label for="birthday" class="form-label">Date of Birth:</label>
                <input type="date" class="form-control" id="birthday" name="birthday" :max="maxBirthday">
            </div>
        </div>

        <div class="row my-2">
            <div class="col-5 col-sm-4">
                <label for="password" class="form-label">Password</label>
                <input type="password" id="password" class="form-control" placeholder="Enter password">
            </div>
            <div class="col-5 col-sm-4">
                <label for="confirmpassword" class="form-label">Confirm password</label>
                <input type="password" id="confirmpassword" class="form-control" placeholder="Confirm password">
            </div>
        </div>
        <div class="row my-2">
            <div class="col-2">
                <label for="gender" class="form-label">Gender</label>
            </div>
            <div class="form-check col-3">
                <input class="form-check-input" type="radio" name="gender" id="male-gender">
                <label class="form-check-label" for="male-gender">Male</label>
            </div>
            <div class="form-check col-3">
                <input class="form-check-input" type="radio" name="gender" id="female-gender">
                <label class="form-check-label" for="female-gender">Female</label>
            </div>
        </div>
        <div class="row my-2">
            <div class="col-2">
                <button class="btn">Sign Up</button>
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

<style scoped>
img.logo{
    width: 120px;
}
button{
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
</style>