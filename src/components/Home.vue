<template>
    <h1>Hello user, this is home page</h1>
</template>

<script>
export default {
    name: 'Home',
    mounted(){
        let user = localStorage.getItem('token');
        if (!user){
           this.$router.push({name: 'Login'});
        }
    }
}
</script> 