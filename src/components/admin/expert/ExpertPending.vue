<template>
    <Navbar></Navbar>

</template>

<script>
import Navbar from '@/components/admin/sidenav.vue';
import 'bootstrap/dist/css/bootstrap.min.css';
export default{
    name: 'ExpertPending',
    data(){
        return {
            allpendingname: [],
            pendings: [],
        }
    },
    components: {
        Navbar,
    },
    methods:{
        
    }
}
</script>

<style>

</style>