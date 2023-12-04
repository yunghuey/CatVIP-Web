<template>
    <Navbar></Navbar>

    <main class="mt-1 pt-3">
        <div class="container-fluid pe-5">
            <div class="row">
                <div class="col-md-12 fw-bold fs-3">Expert Application</div>
            </div>
            <div class="card mt-3 ps-3">
                <div class="card-body">
                    <div class="row">Full name : <span></span></div>
                    <div class="row">Description: <span></span></div>
                    <div class="row">Document: <span></span></div>
                    <div class="row">
                        <div class="col-3 col-sm-6">
                            <select class="form-select" required v-model="status">
                                <option selected>Choose a decision</option>
                                <option value="true">Accept</option>
                                <option value="false">Reject</option>
                            </select>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-3 col-sm-6"> 
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
        if (!user || seller == true){
            localStorage.removeItem('token');
            localStorage.removeItem('isSeller');
            this.$router.push({name:'Login'});
        }
        this.id = this.$route.params.id;
        
    },
    data(){
        return {
            currentForm: null,
            id : 0,
            comment: "",
            status: null,
        }

    },
    methods:{
        async updateStatus(){
            console.log(this.id),
            console.log(this.comment);
            console.log(this.status);
            try{
                let user = localStorage.getItem('token');
                var header = {
                    "Content-Type": "application/json",
                    "Authorization": "bearer " + token,
                };
                const result = axios.put(
                    ApiConstant.UpdateExpertURL,
                    {headers: header}
                );
                if (result.status == 200){
                    alert("Updated expert successfully");
                    this.$router.push({name:'ExpertView'});
                }
            } catch(e){
                console.log(e.response.status);
            }
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