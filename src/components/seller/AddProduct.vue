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
                        <p><img :src="getImageSource()" alt=""></p>
                        <p>Product name : <span v-text="name"></span></p>
                        <p>Description: <span v-text="description"></span></p>
                        <p>Price: <span v-text="price"></span></p>
                        <p>URL: <span v-text="url"></span></p>-->
                    </div> 
                    <div class="row">
                        <div class="image-container">
                            <img :src="getImageSource()" alt="" class="profile-image">
                            <i class="bi bi-pencil-fill edit-icon" @click="triggerFileInput"></i>
                            <input class="form-control" type="file" id="formFile" ref="fileInput" @change="onFileSelected"
                                accept="image/*" hidden>
                        </div>
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
                        <input type="number" id="productPrice" v-model="price" class="form-control" min="0">
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
                    <div class="row justify-content-center mt-3">
                        <div class="col-4 text-center">
                            <input type="submit" class="btn mb-3" v-on:click="addProduct()">
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
            selectedImage: null,
        }

    },
    methods: {
        triggerFileInput() {
            this.$refs.fileInput.click();
        },
        onFileSelected(event) {
            this.selectedImage = event.target.files[0];

            if (this.selectedImage && this.selectedImage.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = () => {
                    // `reader.result` contains the base64 string
                    const base64Url = reader.result;
                    // Do something with the base64 string, such as assigning it to a variable
                    const [, base64String] = base64Url.split(',');
                    this.image = base64String;
                };
                reader.readAsDataURL(this.selectedImage);
            }
            else {
                // Display an error message or take appropriate action
                console.log('Invalid file type. Please select an image.');
            }
        },
        async addProduct() {
            if (this.image == "" && this.name == "") {
                alert("Please insert an image");
                return;
            }
            try {
                console.log("add")
                console.log(this.image);
                
                var header = {
                    "Content-Type": "application/json",
                    "Authorization": "bearer " + this.token,
                };
                if (this.image != ""){
                this.image = this.image.split(',')[1];
            }
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
            if (this.image && this.image !== "") {
                // decode the string
                // create blob

                if (!this.image.startsWith('data:image/png;base64,')) {
                    this.image = 'data:image/png;base64,' + this.image;
                }
                const blob = this.dataURLtoBlob(this.image);
                // create data url from blob
                const dataUrl = URL.createObjectURL(blob);
                return dataUrl;
            } else {
                return defaultProfileImage;
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