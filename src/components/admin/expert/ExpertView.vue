<template>
<!-- list of expert -->
    <Navbar></Navbar>

    <!-- content -->
    <main class="mt-1 pt-3">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12 fw-bold fs-3">Expert Application</div>
            </div>
            
            <!-- table all -->
            <div class="row px-3 py-1">
                <table class="table table-striped" id="viewall">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Full Name</th>
                            <th>Status</th>
                            <th>Updated Date</th>
                            <th>Remark</th>
                            <th>View More</th>
                            <th hidden>Id</th>
                        </tr>
                    </thead>
                    <!-- <tbody>
                        <tr v-for="(exp, index) in allexperts" :key="index">
                            <td v-text="index+1"></td>
                            <td v-text="allexpertname[index]"></td>
                            <td v-text="exp.status"></td>
                            <td v-text="formatDate(exp.dateTime)"></td>
                            <td v-text="exp.rejectedReason"></td>
                            <td><router-link :to="{name: 'ExpertForm', params: {id: exp.id}}" class="hyperlink">View</router-link></td>
                        </tr>
                    </tbody> -->
                </table>
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
import DataTable from 'datatables.net-vue3';
import DataTablesCore from 'datatables.net-bs5';
import $ from 'jquery';
DataTable.use(DataTablesCore);

export default{
    name:'ExpertView',
    data(){
        return {
            token: "",
            allexperts: [],
            allexpertname: [],
            tableData: [],
            columndata: [],
        }
    },
    components:{
        Navbar,
    },
    methods:{
        async getNameFunc(infoarr){
            var namelist = [];
            for(let i = 0 ; i < infoarr.length; i++){
                namelist[i] = await this.getNameById(infoarr[i].catOnwerId);
            }   
            console.log("namelist : " + namelist);
            return namelist;
        },
        async getAllFunc(){ 
            var header = {
                "Content-Type": "application/json",
                "Authorization": "bearer " + this.token,
            };
            await axios.get(
                ApiConstant.GetAllApplicationURL, 
                {headers: header}    
            ).then(
                res => {
                    this.allexperts = res.data;
                    
                    console.log(this.allexperts.length);
                    this.getNameFunc(this.allexperts).then(
                        (result) => {
                            this.allexpertname = result;
                            // build datatable
                            this.tableData = this.createData();
                            this.columndata = [
                                { title: 'No', data: 'index' },
                                { title: 'Full Name', data: 'name' },
                                { title: 'Status', data: 'status' },
                                { title: 'Updated Date', data: 'date' },
                                { title: 'Remark', data: 'remark' },
                                { title: 'View More', data: 'button' },
                                { title: 'Id', visible: false, data: 'id' },
                            ];

                            this.$nextTick(() => {

                                if ($.fn.DataTable.isDataTable("#viewall")) {
                                    $("#viewall").DataTable().clear().draw();
                                    $("#viewall").DataTable().destroy();
                                    $("#viewall thead").html('');
                                }

                                let table = $("#viewall").DataTable({
                                    data: this.tableData,
                                    destroy: true,
                                    paging: true,
                                    columns: this.columndata,
                                });
                                $('#viewall tbody').on('click', 'a', (event) => {
                                    let data = table.row($(event.target).closest('tr')).data();
                                    console.log("event:", JSON.stringify(data));
                                    this.$router.push({ name: 'ExpertForm', params: { id: data.id } });
                                });  
                            }); 


                        });   
                }
            ).catch(
                error => {
                    if(error.response && error.response.status === 401){
                        window.alert("401: Unable to load data");
                    }
                }
            );
        },
        formatDate(dateString){
            let date = new Date(dateString);
            let year = date.getFullYear();
            let month = ('0' + (date.getMonth() + 1)).slice(-2);
            let day = ('0' + date.getDate()).slice(-2);
            let hours = ('0' + date.getHours()).slice(-2);
            let minutes = ('0' + date.getMinutes()).slice(-2);
            return `${year}-${month}-${day} ${hours}:${minutes}`;
        },
        async getNameById(CatOwnerId){
            var name = "";
            var header = {
                "Content-Type": "application/json",
                "Authorization": "bearer " + this.token,
            };

            var url = ApiConstant.GetUserByIdURL + CatOwnerId;
            
            await axios.get(
                url, 
                {headers: header}
            ).then(
                res => {
                    name = res.data.fullName;
                    // console.log("name value: " + name);   
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
        createData(){
            return this.allexperts.map((exp, index) => {
                return {
                    index: index + 1,
                    name: this.allexpertname[index],
                    status: exp.status,
                    date: this.formatDate(exp.dateTime),
                    remark: exp.rejectedReason,
                    id: exp.id,
                    button: "<a class='link'>View</a>"
                };
            });
        },
    },
    async mounted(){
        let user = localStorage.getItem('token');
        let seller = localStorage.getItem('isSeller');
        this.token = user.substring(1, user.length -1);
        if (!user || seller == "yes"){
            localStorage.removeItem('token');
            localStorage.removeItem('isSeller');
           this.$router.push({name: 'Login'});
        }
        await this.getAllFunc();
    },
    created() {
        const reloaded = localStorage.getItem('reloadedall');
        if (reloaded == null || reloaded !== 'true') {
            localStorage.setItem('reloadedall', 'true');
            location.reload();
        } else{
            localStorage.setItem('reloadedall', 'false');
        }
    }
}

</script>

<style scoped>
@import 'bootstrap';
@import 'datatables.net-bs5';
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