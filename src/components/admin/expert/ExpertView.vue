<template>
<!-- list of expert -->
    <Navbar></Navbar>

    <!-- content -->
    <main class="mt-1 pt-3">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12 fw-bold fs-3">Expert Application</div>
            </div>
            <div class="row">
                <div class="col-md-12 fs-4">Pending Application</div>
            </div>
            <!-- table pending-->
            <div class="row px-3 py-1">
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Full name</th>
                            <th>Applied Date</th>
                            <th>View More</th>
                            <th hidden>Id</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(user, index) in pendings" :key="index">
                            <td v-text="index+1"></td>
                            <td v-text="allpendingname[index]"></td>
                            <td v-text="formatDate(user.dateTime)"></td>
                            <td><router-link :to="{name: 'ExpertForm', params: {id: user.id}}" class="hyperlink">View</router-link></td>
                            <td v-text="user.id" hidden></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <!-- table all -->
            <div class="row">
                <div class="col-md-12 fw-bold fs-3">Expert List</div>
            </div>
            <div class="row px-3 py-1">
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Full name</th>
                            <th>Status</th>
                            <th>Date Time</th>
                            <th>Remark</th>
                            <th>View More</th>
                            <th hidden>Id</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(exp, index) in allexperts" :key="index">
                            <td v-text="index+1"></td>
                            <td v-text="allexpertname[index]"></td>
                            <td v-text="exp.status"></td>
                            <td v-text="formatDate(exp.dateTime)"></td>
                            <td v-text="exp.rejectedReason"></td>
                            <td><router-link :to="{name: 'ExpertForm', params: {id: exp.id}}" class="hyperlink">View</router-link></td>
                        </tr>
                    </tbody>
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
export default{
    name:'ExpertView',
    data(){
        return {
            token: "",
            pendings: [],
            allexperts: [],
            allpendingname: [],
            allexpertname: [],
        }
    },
    components:{
        Navbar,
    },
    methods:{
        async getPendingFunc(){ 
            var header = {
                "Content-Type": "application/json",
                "Authorization": "bearer " + this.token,
            };
            axios.get(
                ApiConstant.GetPendingExpertURL, 
                {headers: header}    
            ).then(
                res => {
                    this.pendings = res.data;
                    this.getNameFunc(this.pendings).then((result) => {
                        this.allpendingname = result;
                    });
                }   
            ).catch(
                error => {
                    if(error.response && error.response.status === 401){
                        window.alert("401: Unable to load data");
                    } else{
                        console.log(error);
                    }
                }
            );
        },
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
            axios.get(
                ApiConstant.GetAllApplicationURL, 
                {headers: header}    
            ).then(
                res => {
                    this.allexperts = res.data;
                    this.getNameFunc(this.allexperts).then(
                        (result) => {
                            this.allexpertname = result;
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
        }
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
        await this.getPendingFunc();
        await this.getAllFunc();
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