<template>
    <Navbar></Navbar>

    <main class="mt-1 pt-3">
        <div class="container-fluid pe-5">
            <div class="row">
                <div class="col-md-12 fw-bold fs-3">Expert Application</div>
            </div>
            <div v-if="hasData == true">
                <div class="card my-3 ps-3">
                    <div class="card-body">
                        <p><img :src="getImageSource()" alt=""></p>
                        <p>Full name : <span v-text="fullname"></span></p>
                        <p>Description: <span v-text="form.description"></span></p>
                        <div v-if="form.status == 'Pending'">
                        </div>
                        
                        <p v-if="form.status == 'Pending'">Application Date: <span v-text="formatDate(form.dateTime)"></span></p>
                        <p v-else>Approve Date: <span v-text="formatDate(form.dateTime)"></span></p>
                        Document: <a v-on:click="showPdf(form.documentation, username)" class="download" style="text-decoration: underline;">View Document</a>
                        <div v-if="form.status == 'Pending'">
                            <div class="row">
                            <div class="col-8 col-sm-6">
                                    <select class="form-select" required v-model="status" requierd @change="checkChoice()">
                                        <option value="" selected>Choose a decision</option>
                                        <option value="1">Accept</option>
                                        <option value="3">Reject</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-8 col-sm-6"> 
                                    <div class="form-floating" v-show="showCommentBox">
                                        <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea" v-model="comment" required></textarea>
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
                        <div v-else>
                            <div class="row col-8">Status : <span v-text="form.status"></span></div>
                        </div> 
                    </div>
                </div>
            </div>

            <div v-else>
                Loading
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
import defaultProfileImage from '@/assets/profileimage.png';

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
            showCommentBox: false,
            form: null,
            hasData: false,
            fullname: "",
            username: "",
            profileimg64: ""
        }

    },
    methods:{
        getImageSource() {
            if (this.profileimg64 && this.profileimg64 !== "") {
                this.profileimg64 = 'data:image/png;base64,' + this.profileimg64;
                const blob = this.dataURLtoBlob(this.profileimg64);
                const dataUrl = URL.createObjectURL(blob);
                return dataUrl;
            } else {
                return defaultProfileImage;
            }
        },
        dataURLtoBlob(dataURL) {
            const byteString = atob(dataURL.split(',')[1]);
            const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];
            const ab = new ArrayBuffer(byteString.length);
            const ia = new Uint8Array(ab);
            for (let i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }

            // Create a Blob from the ArrayBuffer
            return new Blob([ab], { type: mimeString });
        },
        checkChoice(){
            this.showCommentBox = this.status === '3';
        }, 
        async updateStatus(){
            if (this.status == "3" && this.comment == ""){
                alert("Please insert rejected reason");
                return;
            }
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

                const result = await axios.put(
                    ApiConstant.UpdateExpertURL,
                    body,
                    {headers: header}
                );
                if (result.status == 200){
                    this.$router.push({name: 'Expert'});
                }else{
                    console.log(result);
                }
            } catch(e){
                this.hasData = false;
                console.log(e.response.data);
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
        showPdf(base64string, username){
            const link = document.createElement('a');
            link.href = `data:application/pdf;base64,${base64string}`;
            link.download = username + '.pdf';
            link.click();
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
                    this.getNameById(this.form.catOnwerId);
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

        },
        getNameById(CatOwnerId){
            try{
                let token = localStorage.getItem('token');
                token = token.substring(1, token.length -1);
                var header = {
                    "Content-Type": "application/json",
                    "Authorization": "bearer " + token,
                };
                var url = ApiConstant.GetUserByIdURL + CatOwnerId;
                axios.get(
                    url, 
                    {headers: header}
                ).then(
                    res => {                       
                        this.fullname = res.data.fullName;
                        this.profileimg64 = res.data.profileImage;
                    }
                ).catch(
                    error => {
                        window.alert("Error in loading data");

                    }
                );
            } catch(e){
                alert(e);
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
.download{
    font-weight: bold;
}
.download:hover{
    cursor: pointer;
}
img{
    width: 170px;
    height: 170px;
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