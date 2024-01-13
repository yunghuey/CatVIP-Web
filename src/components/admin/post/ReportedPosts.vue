<template>
    <Navbar></Navbar>

    <!-- content -->
    <main class="mt-1 pt-3">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12 fw-bold fs-3">Reported Posts</div>
            </div>

            <!-- table all -->
            <div class="row px-3 py-1">
                <table class="table table-striped" id="viewall">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Posted by</th>
                            <th>Posted Date</th>
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
export default {
    name: 'ReportedPosts',
    components: {
        Navbar,
    },
    async mounted() {
        let user = localStorage.getItem('token');
        let seller = localStorage.getItem('isSeller');
        if (!user || seller == true) {
            localStorage.removeItem('token');
            localStorage.removeItem('isSeller');
            this.$router.push({ name: 'Login' });
        }
        this.id = this.$route.params.id;
        await this.getReportedPosts();
    },
    created() {
        const reloaded = localStorage.getItem('reloadedpending');
        if (reloaded == null || reloaded !== 'true') {
            localStorage.setItem('reloadedpending', 'true');
            location.reload();
        } else {
            localStorage.setItem('reloadedpending', 'false');
        }
    },

    data() {
        return {
            token: "",
            posts: []

        }
    },
    methods: {
        async getReportedPosts() {
            console.log("hai")
            // note: waiting update, havent fully tested
            let token = localStorage.getItem('token');
            token = token.substring(1, token.length - 1);
            var header = {
                "Content-Type": "application/json",
                "Authorization": "bearer " + token,
            };
            console.log(token);
            axios.get(
                ApiConstant.GetReportedPostsURL,
                { headers: header }
            ).then(
                res => {
                    this.posts = res.data;
                    console.log(this.posts);
                    this.tableData = this.createData();
                    this.columndata = [
                        { title: 'No', data: 'index' },
                        { title: 'Posted By', data: 'name' },
                        { title: 'Posted Date', data: 'date' },
                        { title: 'View More', data: 'button' },
                        { title: 'Id', visible: false, data: 'id' },
                        { title: 'Images', visible: false, data: 'images', render: this.renderImages }
                    ]
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
                            this.$router.push({
                                name: 'ReviewPost',
                                params: { id: data.id },
                                query: { 
                                    postTypeId: data.postTypeId,
                                    description: data.description,
                                    postImages: JSON.stringify(data.images) 
                                }
                            });
                        });
                    });
                }
            ).catch(
                error => {
                    if (error.response && error.response.status === 401) {
                        window.alert("401: Unable to load data");
                    }
                }
            );
        },
        createData() {
            return this.posts.map((post, index) => {
                return {
                    index: index + 1,
                    name: post.fullName,
                    date: this.formatDate(post.dateTime),
                    id: post.id,
                    images: post.postImages,
                    description: post.description,
                    postTypeId: post.postTypeId,
                    button: "<a class='link'>View</a>"
                };
            });
        },
        renderImages(data, type, row) {
            console.log("image rendering");
            if (type === 'display') {
                const imageHTML = row.images.map(image => `<img src="${image}" alt="Image" style="max-width: 50px; max-height: 50px;">`).join(' ');
                return `<div>${imageHTML}</div>`;
            }
            return data;
        },
        reloadPage() {
            window.location.reload();
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
    }
}
</script>

<style scoped>
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