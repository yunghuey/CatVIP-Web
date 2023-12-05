<template>
    <Navbar></Navbar>

    <main class="mt-1 pt-3">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12 fw-bold fs-3">Put your title here</div>
            </div>
        </div>
    </main>
</template>

<script>
import Navbar from '@/components/admin/sidenav.vue';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { ApiConstant } from "../../../repository/APIConstant.js"
import axios from 'axios';
export default{
    name: 'AllPost',
    components: {
        Navbar,
    },
    mounted(){
        let user = localStorage.getItem('token');
        let seller = localStorage.getItem('isSeller');
        if (!user || seller == true){
            localStorage.removeItem('token');
            localStorage.removeItem('isSeller');
            this.$router.push({name:'Login'});
        }
        this.id = this.$route.params.id;
    },
    data(){
      return{

      }  
    },
    methods:{

    }
}
</script>