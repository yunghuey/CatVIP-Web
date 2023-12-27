<template>
    <div class="card mb-3 me-2 col-7" >
        <div class="card-body">
            <div class="row">
                <div class="col-md-4">
                    <span class="text-title">Total Cat Owners</span><br/>
                    <span class="text-figure" v-text="totalOwnerCount"></span>
                </div>
                <div class="col-md-4">
                    <span class="text-title">Total Cat Experts</span><br/>
                    <span class="text-figure" v-text="totalExpertCount"></span>
                </div>
                <div class="col-md-4">
                    <span class="text-title">Total New User</span><br/>
                    <span class="text-figure" v-text="totalNewUser"></span>
                </div>
            </div>   
        </div>
    </div>
    <div class="card mb-3 me-2 col-4" >
        <div class="card-body">
            <span class="text-title">Total Products Advertised</span><br/>
            <span class="text-figure" v-text="totalProducts"></span>
        </div>
    </div>
</template>

<script>
import { ApiConstant } from '../../repository/APIConstant';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

export default{
    name: 'FigureChart',
    data(){
        return{
            token: '',
            totalExpertCount: 0,
            totalOwnerCount: 0,
            totalNewUser: 0,
            totalProducts: 0,
        }
    },
    async mounted(){
        let user = localStorage.getItem('token');
        this.token = user.substring(1, user.length-1);
        this.getUserCount(); 

    },
    methods: {
        async getUserCount(){
            try{
                var header = {
                    "Content-Type": "application/json",
                    "Authorization": "bearer " + this.token,
                };
                const result = await axios.get(
                    ApiConstant.GetUsersProductCountURL,
                    {headers: header}
                );
                if (result.status == 200){
                    console.log(result.data);
                    this.totalExpertCount = result.data["Cat Experts"];
                    this.totalOwnerCount = result.data["Cat Owners"];
                    this.totalNewUser = result.data["New Users"];
                    this.totalProducts = result.data["Products"];
                    // assign here
                }
            } catch (e) {
                console.log(e);
                alert("Error in getting data...Please try again later");
            }
        },
    }
}

</script>

<style scoped>
 div.row span.text-figure{
    font-size: 35px;
    font-weight: bold;
}
</style>

