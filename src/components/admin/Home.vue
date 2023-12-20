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
                <div class="card mb-3 me-4 col-5" >
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-6">
                                <span class="text-title">Cat owners</span><br/>
                                <span class="text-figure" v-text="totalOwnerCount"></span>
                            </div>
                            <div class="col-md-6">
                                <span class="text-title">Registered user</span><br/>
                                <span class="text-figure" v-text="totalOwnerCount"></span>
                            </div>   
                        </div>   
                    </div>
                </div>
                <div class="card mb-3 me-4 col-5" >
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-6">
                                <span class="text-title">Total Expert Tips</span><br/>
                                <span class="text-figure" v-text="totalExpertCount"></span>
                            </div>
                            <div class="col-md-6">
                                <span class="text-title">Total Daily Posting</span><br/>
                                <span class="text-figure" v-text="totalExpertCount"></span>
                            </div>
                        </div>
                        
                    </div>
                </div>
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
import axios from 'axios';
export default{
    name: "Home",
    components:{
        Navbar,
        CatChart,
        ExpertChart,
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
        this.token = user.substring(1, user.length-1);
        if (!user || seller == "yes"){
            console.log("got rejected in Home");
            localStorage.removeItem('token');
            localStorage.removeItem('isSeller');
           this.$router.push({name: 'Login'});
        }
        this.getUserCount(); 
    },
    methods:{
        async getUserCount(){
            try{
                var header = {
                    "Content-Type": "application/json",
                    "Authorization": "bearer " + this.token,
                };
                const result = await axios.get(
                    ApiConstant.GetUsersCountURL,
                    {headers: header}
                );
                if (result.status == 200){
                    console.log(result.data);
                    this.totalExpertCount = result.data["Cat Expert"];
                    this.totalOwnerCount = result.data["Cat Owner"];
                    // assign here
                }
            }catch (e) {
                alert("Error in getting data...Please try again later");
            }
        },
    },
}

</script>

<style scoped>
main{
    margin-left: 10px;
    padding-left: 10px;
}
main div.container-fluid  div.row span.text-figure{
    font-size: 35px;
    font-weight: bold;
}

@media (min-width: 992px){
    main{
        margin-left: 250px;
    }
}
</style>