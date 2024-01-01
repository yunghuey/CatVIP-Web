<template>
  <div class="col-md-11 m-0 p-0 pe-2">
    <div class="card mb-2">
      <div class="card-body">
        <div class="row button-grp">
          <div class="col-sm-2">
            <h4 class="card-title mb-0">Missing Cats</h4>
            <div class="small text-medium-emphasis" v-text="catduration"></div>
          </div>
          
        </div>
        <div class="row">
          <div class="col-sm-10">
            <label for="">From &nbsp;</label>
            <Datepicker class="date-picker" v-model="fromDate" @selected="setdisabledate" :disabled-dates="disablefrom" ></Datepicker>
            <label for="" class="ms-5">To &nbsp;</label>
            
            <Datepicker class="datepicker" v-model="toDate" :disabled="!fromDate" :disabled-dates="disableto"></Datepicker>
            <button class="btn btn-outline-successs" v-on:click="defineDate" v-if="toDate">Submit</button>
          </div>
        </div>

        <div class="row mt-3">
          <div class="col-sm-8 d-none d-md-block">
            <div class="btn-group float-end me-3" role="group" aria-label="Basic outlined example" >
              <button class="btn btn-outline-secondary" type="button" v-on:click="getMissingCatGraph('7days')" >
                7 Days
              </button>
              <button class="btn btn-outline-secondary" type="button" v-on:click="getMissingCatGraph('weeks')" >
                Weeks
              </button>
              <button class="btn btn-outline-secondary" type="button" v-on:click="getMissingCatGraph('months')" >
                Months
              </button>
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
import Chart from "chart.js";
import { ApiConstant } from "../../repository/APIConstant";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Datepicker from 'vuejs3-datepicker';
import moment from 'moment';

export default {
  name: "CatChart",
  components: {
    Datepicker
  },
  data() {
    return {
      token: "",
      catduration: "Last 7 days",
      catchartlabel: [],
      catchartdata: [],
      fromDate: '',
      toDate: '',
      disableto: null,
      disablefrom: {
        from: new Date(),
      },
      startDate: '',
      endDate: '',
    };
  },
  async mounted() {
    let user = localStorage.getItem("token");
    this.token = user.substring(1, user.length - 1);
    await this.getMissingCatGraph("7days");
  },
  methods: {
    async getMissingCatGraph(query) {
      if (query == "") {
        query = "7days";
      }
      if (query == "7days") {
        this.catduration = "Last 7 days";
      } else if (query == "weeks") {
        this.catduration = "Last 1 months";
      } else if (query == "months") {
        this.catduration = "Last 1 year";
      }
      try {
        var header = {
          "Content-Type": "application/json",
          Authorization: "bearer " + this.token,
        };
        var url = ApiConstant.GetCatCountURL + query;
        
        if (query != "7days") {
          if (this.startDate != "") {
            url += "&startDate=" + this.startDate;
          }
          if (this.endDate != "") {
            url += "&endDate=" + this.endDate;
          }
        }
       
        const result = await axios.get(url, { headers: header });
        if (result.status == 200) {
          // console.log(result.data);
          this.catchartlabel = Object.keys(result.data);
          this.catchartdata = Object.values(result.data);
          const ctx = document.getElementById("missing-cat");
          let catChartData = {
            type: "line",
            data: {
              labels: this.catchartlabel,
              datasets: [
                {
                  label: "Number of missing cat",
                  data: this.catchartdata,
                  backgroundColor: "rgba(54, 73, 90, .5)",
                  borderWidth: 3,
                },
              ],
            },
            options: {
              responsive: true,
              lineTension: 1,
              scales: {
                yAxes: [
                  {
                    ticks: {
                      beginAtZero: true,
                      padding: 10,
                      stepSize: 2,
                    },
                  },
                ],
              },
            },
          };
          new Chart(ctx, catChartData);
          return;
        }
      } catch (e) {
        // alert("Error in getting missing cat data...Please try again later");
      }
    },
    setdisabledate() {
      this.$nextTick(() => {
      let fromDate = new Date(this.fromDate);
      fromDate.setDate(fromDate.getDate() + 1);
      let lastDate = new Date();
      lastDate.setDate(lastDate.getDate());
      this.disableto = {
        to: fromDate,
        from: lastDate,
      };
    });
    },
    defineDate(){
      this.startDate = moment(this.fromDate).format('YYYY-MM-DD');
      this.endDate = moment(this.toDate).format('YYYY-MM-DD');
      this.getMissingCatGraph('weeks');
    },
  },
  async created() {
    const reloaded = localStorage.getItem("reloadcat");
    if (reloaded == null || reloaded !== "true") {
      localStorage.setItem("reloadcat", "true");
    } else {
      await this.getMissingCatGraph("7days");
      localStorage.setItem("reloadcat", "false");
    }
  },
};
</script>
<style scoped>
.btn-outline-successs{
    width: 80px;
    margin-left: 30px;
    height: 50px;
    margin-bottom: 5px;
    color: var(--dark-color);
    background-color: var(--light-color);
    border: 1px solid var(--dark-color);
}
.btn-outline-successs:hover{
  border: 1px solid var(--dark-color);
    color: #FFF;
    background-color: var(--gold-neutral-color);
}

div.row span.text-title,
div.row .small {
  color: rgb(103, 99, 99);
  font-size: 18px;
}
main div.container-fluid div.row div.chart-wrapper {
  margin-top: 10px;
}
</style>