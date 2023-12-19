<template>
    <Navbar></Navbar>

    <main class="mt-1 pt-3">
        <div class="container-fluid pe-5">
            <div class="row">
                <div class="col-md-12 fw-bold fs-3">Add Product</div>
            </div>
            <div v-if="hasData == true">
                <div class="card my-3 ps-3">
                    <div class="card-body">
                        <p><img :src="getImageSource()" alt=""></p>                        <p>Product name : <span v-text="name"></span></p>
                        <p>Description: <span v-text="description"></span></p>
                        <p>Price: <span v-text="price"></span></p>
                        <p>URL: <span v-text="url"></span></p>
                    </div>
                    <div class="row px-3 py-1">
                        <label for="productName">Product Name:</label>
                        <input type="text" id="productName" v-model="name" class="form-control">
                    </div>

                    <div class="row px-3 py-1">
                        <label for="productDescription">Description:</label>
                        <textarea id="productDescription" v-model="description" class="form-control"></textarea>
                    </div>

                    <div class="row px-3 py-1">
                        <label for="productPrice">Price:</label>
                        <input type="number" id="productPrice" v-model="price" class="form-control">
                    </div>

                    <div class="row px-3 py-1">
                        <label for="productUrl">URL:</label>
                        <input type="text" id="productUrl" v-model="url" class="form-control">
                    </div>
                    <div class="row px-3 py-1">
                        <label for="productTypes">Select Product Type:</label>
                        <select v-model="selectedProductType" @change="handleProductTypeChange" id="productTypes"
                            class="form-select">
                            <option v-for="(productType, index) in productTypes" :key="index" :value="productType.id">
                                {{ productType.name }}
                            </option>
                        </select>

                    </div>
                    <div class="row">
                        <div class="col-4 justify-content-end">
                            <input type="submit" class="btn" v-on:click="addProduct()">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import Navbar from '@/components/seller/sellernav.vue';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { ApiConstant } from "../../repository/APIConstant.js"
import axios from 'axios';
import defaultProfileImage from '@/assets/profileimage.png';

export default {
    name: 'AddProduct',
    components: {
        Navbar,
    },
    async mounted() {
        let user = localStorage.getItem('token');
        console.log("heloo", user)
        let seller = localStorage.getItem('isSeller');
        this.token = user.substring(1, user.length - 1);
        if (!user || seller == "no") {
            localStorage.removeItem('token');
            localStorage.removeItem('isSeller');
            this.$rouer.push({ name: 'Login' });
        }

        await this.getProductTypes();

    },
    data() {
        return {
            hasData: true,
            showCommentBox: false,
            form: null,
            token: "",

            // add product
            name: "",
            price: 0,
            description: "",
            productTypeId: 0,
            url: "",
            image: "",

            // get product types
            productTypes: [],
            selectedProductType: null,
        }

    },
    methods: {
        async addProduct() {
            // if (this.status == "3" && this.comment == "") {
            //     alert("Please insert rejected reason");
            //     return;
            // }
            try {
                // let token = localStorage.getItem('token');
                // if (!token) {
                //     console.error("Token not found in localStorage");
                //     return;
                // }
                console.log("add")
                var header = {
                    "Content-Type": "application/json",
                    "Authorization": "bearer " + this.token,
                };
                var body = {
                    "name": this.name,
                    "price": this.price,
                    "description": this.description,
                    "productTypeId": this.selectedProductType,
                    "url": this.url,
                    "image": this.image
                };

                const result = await axios.post(
                    ApiConstant.AddProductURL,
                    body,
                    { headers: header }
                );
                if (result.status == 200) {
                    this.$router.push({ name: 'ProductList' });
                } else {
                    console.log(result);
                }
            } catch (e) {
                this.hasData = false;
                console.log(e.response.data);
            }
        },
        async getProductTypes() {
            console.log("hai")
            console.log(this.token)
            // note: waiting update, havent fully tested
            var header = {
                "Content-Type": "application/json",
                "Authorization": "bearer " + this.token,
            };
            axios.get(
                ApiConstant.GetProductTypesURL,
                { headers: header }
            ).then(
                res => {
                    this.productTypes = res.data;
                    // console.log(this.posts);
                    // this.tableData = this.createData();
                    // this.columndata = [
                    //     { title: 'No', data: 'index' },
                    //     { title: 'Full Name', data: 'name' },
                    //     { title: 'Reported Date', data: 'date' },
                    //     { title: 'View More', data: 'button' },
                    //     { title: 'Id', visible: false, data: 'id' },
                    //     { title: 'Images', visible: false, data: 'images', render: this.renderImages }
                    // ]
                    // this.$nextTick(() => {

                    //     if ($.fn.DataTable.isDataTable("#viewall")) {
                    //         $("#viewall").DataTable().clear().draw();
                    //         $("#viewall").DataTable().destroy();
                    //         $("#viewall thead").html('');
                    //     }

                    //     let table = $("#viewall").DataTable({
                    //         data: this.tableData,
                    //         destroy: true,
                    //         paging: true,
                    //         columns: this.columndata,
                    //     });
                    //     $('#viewall tbody').on('click', 'a', (event) => {
                    //         let data = table.row($(event.target).closest('tr')).data();
                    //         console.log("event:", JSON.stringify(data));
                    //         this.$router.push({
                    //             name: 'ReviewPost',
                    //             params: { id: data.id },
                    //             query: { postImages: JSON.stringify(data.images) }
                    //         });
                    //     });
                    // });
                }
            ).catch(
                error => {
                    if (error.response && error.response.status === 401) {
                        window.alert("401: Unable to load data");
                    }
                }
            );
        },
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

div.row {
    margin-top: 10px;
}

.btn {
    color: var(--dark-color);
    background-color: var(--light-color);
}

.download {
    font-weight: bold;
}

.download:hover {
    cursor: pointer;
}

img {
    width: 170px;
    height: 170px;
}

.btn:hover {
    border: 1px solid var(--dark-color);
    color: #FFF;
    background-color: var(--gold-neutral-color);
}

@media (min-width: 992px) {

    main {
        margin-left: 250px;
    }
}
</style>