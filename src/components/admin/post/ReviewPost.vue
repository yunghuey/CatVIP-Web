<template>
    <Navbar v-if="!isSeller"></Navbar>
    <Navbar2 v-else></Navbar2>
    <!-- start code here -->
    <main class="mt-1 pt-3">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12 fw-bold fs-3">Review post</div>
            </div>
            <div class="row my-2">
                <div class="col-8">
                    <b :class="{ 'text-success': displayMessage }" style="white-space: pre-line; font-size: large;">{{
                        updateMessage }}</b>
                </div>
                <div class="row">
                    <div class="col-md-12 text-center fw-bold fs-4">
                        {{ this.postTypeId == 1 ? 'Daily Sharing' : this.postTypeId == 2 ? 'Expert Tips' : '' }}
                    </div>
                </div>
            </div>
            <div class="row justify-content-center">
                <div v-if="imageSources.length > 0" v-for="(imageSource, index) in imageSources" :key="index"
                    class="image-container">
                    <img :src="imageSource" alt="" class="post-image">
                </div>
                <div v-else>
                    <!-- This block is empty, so nothing will be displayed when imageSources.length is 0 -->
                </div>
                <div class="col-12 text-center">
                    <div class="description-container">
                        {{ this.description }}
                    </div>
                </div>
            </div>
            <div class="row px-3 py-1">
                <div class="col-12 text-center"> <!-- Center the table horizontally -->
                    <table class="table table-striped" id="viewall">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Reporter Full Name</th>
                                <th>Remark</th>
                                <th>Reported Date</th>
                            </tr>
                        </thead>
                    </table>
                </div>
            </div>
            <div class="row justify-content-center">
                <div class="col-sm-6 col-md-8 d-flex align-items-center justify-content-center">
                    <button class="btn" v-on:click="deletePost">Delete</button>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import Navbar from '@/components/admin/sidenav.vue';
import Navbar2 from '@/components/seller/sellernav.vue';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { ApiConstant } from "../../../repository/APIConstant.js"
import axios from 'axios';
import $ from 'jquery';
import DataTable from 'datatables.net-vue3';
import DataTablesCore from 'datatables.net-bs5';
import defaultProfileImage from '@/assets/profileimage.png';

export default {
    name: "ReviewPost",
    components: {
        Navbar,
        Navbar2,
    },
    async mounted() {
        let user = localStorage.getItem('token');
        let seller = localStorage.getItem('isSeller');
        this.token = user.substring(1, user.length - 1);
        if (!user) {
            console.log("got rejected in Home");
            localStorage.removeItem('token');
            localStorage.removeItem('isSeller');
            this.$router.push({ name: 'Login' });
        }
        if (seller == "yes") {
            this.isSeller = true;
        }

        console.log('Route Object:', this.$route);
        const postImages = JSON.parse(this.$route.query.postImages || 'null');
        console.log('postImages:', postImages);
        this.id = this.$route.params.id;
        this.postImages = JSON.parse(this.$route.query.postImages || 'null');
        this.description = this.$route.query.description;
        this.postTypeId = this.$route.query.postTypeId;

        await this.getReportedPostDetails();
        this.imageSources = this.getImageSource();
    },
    data() {
        return {
            token: '',
            isSeller: false,
            displayMessage: true,
            imageSources: [],
            username: '',
            fullname: '',
            description: '',
            dateTime: '',
            postDetails: null,
            profileimg64: '',
        }
    },
    methods: {
        async deletePost() {
            this.displayMessage = true;
            this.updateMessage = "Loading...";
            var header = {
                "Content-Type": "application/json",
                "Authorization": "bearer " + this.token,
            };
            var url = ApiConstant.DeletePostURL + this.id;
            await axios.delete(
                url,
                { headers: header }
            ).then(
                res => {
                    if (res.status == 200) {
                        this.updateMessage = '';
                        this.displayMessage = false;
                        this.$router.go();
                    } else {
                        this.updateMessage = res.status;
                        this.displayMessage = true;
                    }
                }
            ).catch(
                error => {
                    console.log(error.response);
                    this.updateMessage = 'Error when updating';
                    this.displayMessage = true;
                }
            );
        },
        getImageSource() {
            if (Array.isArray(this.postImages) && this.postImages.length > 0) {
                return this.postImages.map(item => {
                    // Access the 'image' property of the object
                    const originalImage = item.image;

                    // Check if image is a string
                    if (typeof originalImage === 'string') {
                        // decode the string
                        // create blob
                        let modifiedImage = originalImage;
                        console.log('hai', modifiedImage);

                        if (!modifiedImage.startsWith('data:image/png;base64,')) {
                            modifiedImage = 'data:image/png;base64,' + modifiedImage;
                        }

                        const blob = this.dataURLtoBlob(modifiedImage);
                        // create data URL from blob
                        return URL.createObjectURL(blob);
                    } else {
                        // Handle the case where image is not a string (perhaps a different data type)
                        console.error('Invalid image format:', originalImage);
                        return defaultProfileImage;
                    }
                });
            } else {
                //return [defaultProfileImage];
            }
        },
        dataURLtoBlob(dataURL) {
            // Convert base64 to raw binary data held in a string
            const byteString = atob(dataURL.split(',')[1]);

            // Separate the MIME component
            const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];

            // Write the bytes of the string to an ArrayBuffer
            const ab = new ArrayBuffer(byteString.length);
            const ia = new Uint8Array(ab);
            for (let i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }

            // Create a Blob from the ArrayBuffer
            return new Blob([ab], { type: mimeString });
        },
        async getReportedPostDetails() {
            console.log("hai test dulu");
            // note: waiting update, havent fully tested
            let token = localStorage.getItem('token');
            token = token.substring(1, token.length - 1);
            var header = {
                "Content-Type": "application/json",
                "Authorization": "bearer " + token,
            };
            console.log(token);
            axios.get(
                ApiConstant.GetReportedPostDetailsURL + this.id,
                { headers: header }
            ).then(
                res => {
                    this.postDetails = res.data;
                    console.log("test");
                    console.log(this.postDetails);
                    this.tableData = this.createData();
                    this.columndata = [
                        { title: 'No', data: 'index' },
                        { title: 'Reporter Full Name', data: 'name' },
                        { title: 'Remark', data: 'remark' },
                        { title: 'Reported Date', data: 'date' },
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
                        console.log("After DataTable Initialization", table);
                        $('#viewall tbody').on('click', 'a', (event) => {
                            let data = table.row($(event.target).closest('tr')).data();
                            console.log("event:", JSON.stringify(data));
                            this.$router.push({
                                name: 'ReviewPost',
                                params: { id: data.id },
                                query: { postImages: JSON.stringify(data.images) }
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
            return this.postDetails.map((postDetail, index) => {
                return {
                    index: index + 1,
                    name: postDetail.fullName,
                    date: this.formatDate(postDetail.dateTime),
                    remark: postDetail.description,
                };
            });
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
    },
    computed: {
        maxBirthday() {
            const currentDate = new Date();
            const maxDate = new Date(currentDate.getFullYear() - 18, currentDate.getMonth(), currentDate.getDate());
            const formattedMaxDate = maxDate.toISOString().split('T')[0];
            return formattedMaxDate;
        }
    },

}
</script>

<style scoped>
main {
    margin-left: 10px;
    padding-left: 10px;
}

img {
    border: 1.5px solid black;
    width: 200px;
    height: 200px;
    object-fit: cover;
    margin: 0 auto;
}

.image-container {
    position: relative;
    width: 202px;
    height: 202px;
    margin: 20px 20px;
    padding: 0;
    border: 1px solid black;
}

.profile-image {
    width: 100%;
    height: 100%;
}

.edit-icon {
    position: absolute;
    bottom: 0;
    right: 0;
    color: white;
    /* Change the color as needed */
    background: rgba(0, 0, 0, 0.8);
    /* Change the background as needed */
    padding: 8px;
    cursor: pointer;
}

button {
    width: 200px;
    color: var(--dark-color);
    background-color: var(--light-color);
    border: 1px solid var(--dark-color);
}

button:hover {
    border: 1px solid var(--dark-color);
    color: #FFF;
    background-color: var(--gold-neutral-color);
}

input[type='radio']:after {
    width: 17px;
    height: 17px;
    border-radius: 15px;
    top: -3px;
    left: -1px;
    position: relative;
    background-color: #d1d3d1;
    content: '';
    display: inline-block;
    visibility: visible;
    border: 2px solid white;
}

input[type='radio']:checked:after {
    width: 17px;
    height: 17px;
    border-radius: 15px;
    top: -3px;
    left: -1px;
    position: relative;
    background-color: var(--gold-neutral-color);
    content: '';
    display: inline-block;
    visibility: visible;
    border: 2px solid white;
}

@media (min-width: 992px) {

    main {
        margin-left: 250px;
    }

}
</style>