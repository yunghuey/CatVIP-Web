<template>
    <div class="col-md-11 m-0 p-0">
        <div class="card mb-4">
            <div class="card-body">
                <div class="row button-grp">
                    <div class="col-sm-5">
                        <h4 class="card-title mb-0">Number of Posts</h4>
                        <div class="small text-medium-emphasis" v-text="expertduration"></div>
                    </div>
                    <div class="col-sm-7 d-none d-md-block">
                        <div class="btn-group float-end me-3" role="group" aria-label="Basic outlined example">
                            <button class="btn btn-outline-secondary" type="button" v-on:click="getExpertTipGraph('today')">Today</button>
                            <button class="btn btn-outline-secondary" type="button" v-on:click="getExpertTipGraph('lastWeek')">Week</button>
                            <button class="btn btn-outline-secondary" type="button" v-on:click="getExpertTipGraph('lastMonth')">Month</button>
                            <button class="btn btn-outline-secondary" type="button" v-on:click="getExpertTipGraph('last3Months')">3 months</button>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-5 col-sm-8">
                        <span class="text-title"><b>Expert tips</b></span><br>
                        <span v-text="expertdata" class="expert-figure"></span>
                    </div>
                    <div class="col-md-5 col-sm-8">
                        <span class="text-title"><b>Daily Sharing</b></span><br>
                        <span v-text="dailydata" class="expert-figure"></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ApiConstant } from '../../repository/APIConstant';
import axios from 'axios';

export default{
    name: 'ExpertChart',
    data(){
        return{
            token: '',
            expertduration: 'Today',
            expertdata: 0,
            dailydata: 0,
        }
    },
    async mounted(){
        let user = localStorage.getItem("token");
        let seller = localStorage.getItem('isSeller');
        if (!user || seller == "yes") {
            localStorage.removeItem('token');
            localStorage.removeItem('isSeller');
            this.$router.push({ name: 'Login' });
        }
        else {
            this.token = user.substring(1, user.length - 1);
            await this.getExpertTipGraph('today');
        }
    },
    methods:{
        async getExpertTipGraph(query){
           if (query == 'today'){
            this.expertduration = 'Today';
           } else if (query == 'lastWeek'){
            this.expertduration = 'Last 7 days';
           } else if (query == 'lastMonth'){
            this.expertduration = 'Last month';
           } else if (query == 'last3Months'){
            this.expertduration = 'Last 3 months';
           }

           try{
                var header = {
                    "Content-Type": "application/json",
                    "Authorization": "bearer " + this.token,
                };
                var url = ApiConstant.GetExpertTipsCountURL + query;
                const result = await axios.get(
                    url, {headers: header}
                );
                if (result.status == 200){
                    this.expertdata = result.data["Expert Tips"];
                    this.dailydata = result.data["Posts"];
                }
           } catch (e) {
                alert("Error in getting expert tips data...Please try again later");
           }
        },
    }
}
</script>

<style scoped>
span.expert-figure{
    font-size: 40px;
    font-weight: bold;
}
div.row span.text-title,
div.row .small{
    color: rgb(103, 99, 99);
    font-size: 18px;
}
</style>