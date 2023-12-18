<template>
    <div class="col-md-11 m-0 p-0 pe-3">
        <div class="card mb-4">
            <div class="card-body">
                <div class="row button-grp">
                    <div class="col-sm-5">
                        <h4 class="card-title mb-0">Missing Cats</h4>
                        <div class="small text-medium-emphasis" v-text="catduration"></div>
                    </div>
                    <div class="col-sm-7 d-none d-md-block">
                        <div class="btn-group float-end me-3" role="group" aria-label="Basic outlined example">
                            <button class="btn btn-outline-secondary" type="button" v-on:click="getMissingCatGraph('lastWeek')">Week</button>
                            <button class="btn btn-outline-secondary" type="button" v-on:click="getMissingCatGraph('last28Days')">Month</button>
                            <button class="btn btn-outline-secondary" type="button" v-on:click="getMissingCatGraph('last12Months')">Year</button>
                        </div>
                    </div>
                </div>
                <div class="row graph">
                    <div class="chart-wrapper">
                        <canvas id="missing-cat"></canvas>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Chart from 'chart.js'
import { ApiConstant } from '../../repository/APIConstant';
import axios from 'axios';

export default{
    name: 'CatChart',
    data(){
        return{
            token: '',
            catduration: 'Last 7 days',
            catchartlabel: [],
            catchartdata:[],
        }
    },
    async mounted(){
        let user = localStorage.getItem('token');
        this.token = user.substring(1, user.length-1);
        await this.getMissingCatGraph("lastWeek");
        const ctx = document.getElementById('missing-cat');
        let catChartData = {
            type : 'line',
            data: {
                labels: this.catchartlabel,
                datasets: [{
                    label: "Number of missing cat",
                    data: this.catchartdata,
                    backgroundColor: "rgba(54, 73, 90, .5)",
                    borderWidth: 3,
                },],
            },
            options: {
                responsive: true,
                lineTension: 1,
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            padding: 10,
                        }
                    }]
                },
            }
        }
        new Chart(ctx,catChartData);
    },
    methods:{
        async getMissingCatGraph(query){
            if (query == 'lastWeek'){
                this.catduration = 'Last 7 days';
            } else if (query == 'last28Days'){
                this.catduration = 'Last 1 months';
            } else if (query == 'last12Months'){
                this.catduration = 'Last 1 year';
            }
            try{
                var header = {
                    "Content-Type": "application/json",
                    "Authorization": "bearer " + this.token,
                };
                var url = ApiConstant.GetCatCountURL + query;
                const result = await axios.get(
                    url, {headers: header}
                );
                if (result.status == 200){
                    this.catchartlabel = Object.keys(result.data);
                    this.catchartdata = Object.values(result.data);
                    return;
                }
                alert(result.data);
            } catch (e){
                alert("Error in getting missing cat data...Please try again later");
                console.log(e);
            }
        }
    }
}
</script>
<style scoped>
main div.container-fluid  div.row span.text-title,
main div.container-fluid  div.row .small{
    color: rgb(103, 99, 99);
    font-size: 18px;
}
main div.container-fluid  div.row div.chart-wrapper{
    margin-top: 10px;
}
</style>