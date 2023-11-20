<template>
    <h1>Hello user, this is home page</h1>
    <button class="btn" v-on:click="logout">Logout</button>
</template>

<script>
export default {
    name: 'Home',
    mounted(){
        let user = localStorage.getItem('token');
        if (!user){
           this.$router.push({name: 'Login'});
        }
    },
    methods: {
        logout(){
            localStorage.removeItem('token');
            this.$router.push({name: 'Login'});
        }

    },
}
</script> 