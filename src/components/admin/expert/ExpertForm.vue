<template>
    <Navbar></Navbar>

    <main class="mt-1 pt-3">
        <div class="container-fluid pe-5">
            <div class="row">
                <div class="col-md-12 fw-bold fs-3">Expert Application</div>
            </div>
            <div v-if="hasData == true">
                <div class="card mt-3 ps-3">
                    <div class="card-body">
                        <div class="row col-8">Full name : <span></span></div>
                        <div class="row col-8">Description: <span v-text="form.description"></span></div>
                        <div class="row col-8">Application Date: <span v-text="formatDate(form.dateTime)"></span></div>
                        <div class="row col-8">Document: <span></span></div>
                        <div class="row">
                            <div class="col-8 col-sm-6">
                                <select class="form-select" required v-model="status">
                                    <option value="" selected>Choose a decision</option>
                                    <option value="1">Accept</option>
                                    <option value="3">Reject</option>
                                </select>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-8 col-sm-6"> 
                                <div class="form-floating">
                                    <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea" v-model="comment"></textarea>
                                    <label for="floatingTextarea">Comments</label>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-4 justify-content-end">
                                <input type="submit" class="btn" v-on:click="updateStatus()">
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div v-else>
                <span v-text="hasData"></span>
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
    name:'ExpertForm',
    components:{
        Navbar,
    },
    mounted(){
        let user = localStorage.getItem('token');
        let seller = localStorage.getItem('isSeller');
        if (!user || seller == "yes"){
            localStorage.removeItem('token');
            localStorage.removeItem('isSeller');
           this.$router.push({name: 'Login'});
        }
        this.id = this.$route.params.id;
        this.getSingleForm(this.id);

    },
    data(){
        return {
            id : 0,
            comment: "",
            status: "",
            form: null,
            hasData: false,
        }

    },
    methods:{
        async updateStatus(){
            console.log(this.id),
            console.log(this.comment);
            console.log(this.status);
            try{
                let token = localStorage.getItem('token');
                token = token.substring(1, token.length -1);
                var header = {
                    "Content-Type": "application/json",
                    "Authorization": "bearer " + token,
                };
                var body = {
                    "applictionId": this.id,
                    "statusId": this.status,
                    "rejectedReason": this.comment
                };

                console.log(token);
                const result = axios.put(
                    ApiConstant.UpdateExpertURL,
                    body,
                    {headers: header}
                );
                print(result.status);
                if (result.status == 200){
                    alert("Updated expert successfully");
                    this.$router.push({name:'ExpertView'});
                }
            } catch(e){
                console.log(e.response);
            }
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
        getSingleForm(id){
            let token = localStorage.getItem('token');
            token = token.substring(1, token.length -1);
            var header = {
                "Content-Type": "application/json",
                "Authorization": "bearer " + token,
            };
            var url = ApiConstant.GetApplicationByIdURL + id;
            axios.get(
                url, {headers: header}
            ).then(
                res => {
                    this.form = res.data;
                    this.hasData = true;
                }
            ).catch(
                error => {
                    if(error.response && error.response.status === 401){
                        window.alert("401: Not allow to load data");
                    }

                    if(error.response && error.response.status === 403){
                        window.alert("403: not applicable in web");
                    }
                }
            );

        }
    }
}
</script>

<style scoped>
main{
    margin-left: 10px;
    padding-left: 10px;
}
div.row{
    margin-top: 10px;
}
.btn{
    color: var(--dark-color);
    background-color: var(--light-color);
}
.btn:hover{
    border: 1px solid var(--dark-color);
    color: #FFF;
    background-color: var(--gold-neutral-color);
}
@media (min-width: 992px){
    
    main{
        margin-left: 250px;
    }
  
}
</style>