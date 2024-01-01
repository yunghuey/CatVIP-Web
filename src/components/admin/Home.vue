<template>

    <Navbar></Navbar>

    <!-- content -->
    <main class="mt-1 pt-3">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12 fw-bold fs-3">Dashboard</div>
            </div>
            <!-- display figure for total app user -->
            <div class="row">
                <FigureChart></FigureChart>
            </div>
            
            <div class="row">
                <ExpertChart></ExpertChart>
            </div>
            
            <!-- line chart for missing cat case -->
            <div class="row">
                <CatChart></CatChart>
            </div>

        </div>
    </main>

</template>

<script>
import Navbar from '@/components/admin/sidenav.vue';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ApiConstant } from '../../repository/APIConstant';
import CatChart from '@/components/admin/CatChart.vue';
import ExpertChart from '@/components/admin/ExpertChart.vue';
import FigureChart from '@/components/admin/FigureChart.vue';
import axios from 'axios';
export default{
    name: "Home",
    components:{
        Navbar,
        CatChart,
        ExpertChart,
        FigureChart,
    },
    data(){
        return {
            totalOwnerCount: 5,
            totalExpertCount: 7,
            token: "",
        }
    },
    mounted(){
        let user = localStorage.getItem('token');
        let seller = localStorage.getItem('isSeller');
        if (!user || seller == "yes"){
            console.log('got rejected');
            localStorage.removeItem('token');
            localStorage.removeItem('isSeller');
            this.$router.push({name: 'Login'}).then( () => {});
        } 
        else {
            this.token = user.substring(1, user.length -1);
        }
    },
    methods:{
       
    },
}

</script>

<style scoped>
main{
    margin-left: 10px;
    padding-left: 10px;
}

@media (min-width: 992px){
    main{
        margin-left: 250px;
    }
}
</style>