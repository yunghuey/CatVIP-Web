<template>
  <Navbar></Navbar>
  <main class="mt-1 pt-3">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12 fw-bold fs-3">Pending Application</div>
      </div>
      <div class="row px-3 py-1">
        <table id="viewpending" class="table table-striped">
          <thead>
            <tr>
              <th>No</th>
              <th>Full name</th>
              <th>Applied Date</th>
              <th>View More</th>
              <th hidden>Id</th>
            </tr>
          </thead>
        </table>
      </div>
    </div>
  </main>
</template>

<script>
import Navbar from '@/components/admin/sidenav.vue';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ApiConstant } from "../../../repository/APIConstant.js"
import axios from 'axios';
import DataTable from 'datatables.net-vue3';
import DataTablesCore from 'datatables.net-bs5';
import $ from 'jquery';
DataTable.use(DataTablesCore);

export default {
  name: 'ExpertPending',
  components: {
    Navbar,
    DataTable,
  },
  data() {
    return {
      token: "",
      allpendingname: [],
      pendings: [],
      tableData: [],
      columndata: [],
    };
  },

  methods: {
    initializeDataTable() {
      
      let table = $("#viewpending").DataTable({
        data: this.tableData,
        columns: this.columndata,
      });
      $('#viewpending tbody').on('click', 'a', (event) => {
        let data = table.row($(event.target).closest('tr')).data();
        console.log("event:", JSON.stringify(data));
        this.$router.push({ name: 'ExpertForm', params: { id: data.id } });
      });
    },
    async getPendingFunc() {
      try {
        var header = {
          "Content-Type": "application/json",
          "Authorization": "bearer " + this.token,
        };
        const res = await axios.get(ApiConstant.GetPendingExpertURL, { headers: header });
        this.pendings = res.data;

        await this.getNameFunc(this.pendings);
        this.allpendingname = await this.getNameFunc(this.pendings);
        this.tableData = this.createData();
        this.columndata = [
          { title: 'No', data: 'index' },
          { title: 'Full Name', data: 'name' },
          { title: 'Applied Date', data: 'date' },
          { title: 'View More', data: 'button' },
          { title: 'Id', visible: false, data: 'id' },
        ];
        let dataTable = $("#viewpending").DataTable();

    //   if ($.fn.DataTable.isDataTable("#viewpending")) {
        dataTable.clear().destroy();
        $("#viewpending thead").html('');
        $("#viewpending tbody").html('');
        $("#viewpending").empty();
        console.log('clear table');       
    //   }

        this.$nextTick(() => {
          this.initializeDataTable();
        });
      } catch (error) {
        if (error.response && error.response.status === 401) {
          window.alert("401: Unable to load data");
        } else {
          console.log(error);
        }
      }
    },
    async getNameFunc(infoarr) {
      var namelist = [];
      for (let i = 0; i < infoarr.length; i++) {
        namelist[i] = await this.getNameById(infoarr[i].catOnwerId);
      }
      console.log("namelist pending : " + namelist);

      return namelist;
    },
    formatDate(dateString) {
      let date = new Date(dateString);
      let year = date.getFullYear();
      let month = ('0' + (date.getMonth() + 1)).slice(-2);
      let day = ('0' + date.getDate()).slice(-2);
      let hours = ('0' + date.getHours()).slice(-2);
      let minutes = ('0' + date.getMinutes()).slice(-2);
      return `${year}-${month}-${day} ${hours}:${minutes}`;
    },
    async getNameById(CatOwnerId) {
      var name = "";
      var header = {
        "Content-Type": "application/json",
        "Authorization": "bearer " + this.token,
      };

      var url = ApiConstant.GetUserByIdURL + CatOwnerId;

      await axios.get(
        url,
        { headers: header }
      ).then(
        res => {
          name = res.data.fullName;
          return name;
        }
      )
        .catch(
          error => {
            window.alert("Error in loading data");
          }
        );
      return name;
    },
    createData() {
      return this.pendings.map((pending, index) => {
        return {
          index: index + 1,
          name: this.allpendingname[index],
          date: this.formatDate(pending.dateTime),
          id: pending.id,
          button: "<a class='link'>View</a>"
        };
      });
    },
  },
  async mounted() {
    let user = localStorage.getItem('token');
    let seller = localStorage.getItem('isSeller');
    this.token = user.substring(1, user.length - 1);
    if (!user || seller == "yes") {
      localStorage.removeItem('token');
      localStorage.removeItem('isSeller');
      this.$router.push({ name: 'Login' });
    }

    await this.getPendingFunc();
  },
  created() {
   const reloaded = localStorage.getItem('reloadedpending');
   if (reloaded == null || reloaded !== 'true') {
       localStorage.setItem('reloadedpending', 'true');
       location.reload();
   } else{
    localStorage.setItem('reloadedpending', 'false');
   }
 }

};
</script>

<style scoped>
@import "bootstrap";
@import "datatables.net-bs5";

.link {
  cursor: pointer;
}
main {
  margin-left: 10px;
  padding-left: 10px;
}
@media (min-width: 992px) {
  main {
    margin-left: 250px;
  }
}
</style>

