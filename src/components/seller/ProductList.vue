<template>
    <Navbar></Navbar>
    <main class="mt-1 pt-3">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12 fw-bold fs-3">Product List</div>
            </div>
            <div class="row ">
                <div class="float-end">
                    <button class="btn">Add Product</button>
                </div>
            </div>

            <div class="row px-3 py-1">
                <table class="table table-striped" id="viewall">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Description</th>
                            <th>URL</th>
                            <th>Edit</th>
                            <th>Delete</th>
                            <th hidden>Id</th>
                        </tr>
                    </thead>
                </table>
            </div>

            <!-- Modal -->
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Delete product</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                    <div class="modal-body">
                        Do you want to delete this product?
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-alert">Delete</button>
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
import DataTable from 'datatables.net-vue3';
import DataTablesCore from 'datatables.net-bs5';
import $ from 'jquery';
DataTable.use(DataTablesCore);

export default{
    name: 'ProductList',
    components:{
        Navbar,
    },
    data(){
        return{
            token: "",
            allproductlist:[],
            tableData: [],
            columnData: [],
            isRun: false,
        }
    },
    async mounted(){
        let user = localStorage.getItem('token');
        let seller = localStorage.getItem('isSeller');
        this.token = user.substring(1, user.length -1);
        if (!user || seller == "no"){
            localStorage.removeItem('token');
            localStorage.removeItem('isSeller');
           this.$rouer.push({name: 'Login'});
        }
        await this.getAllProducts();
    },
    methods:{
        async getAllProducts(){
            var header = {
                "Content-Type": "application/json",
                "Authorization": "bearer " + this.token,
            };
            await axios.get(
                ApiConstant.GetAllProductURL,
                {headers: header}
            ).then(
                res => {
                    this.allproductlist = res.data;
                    console.log(this.allproductlist);
                    this.tableData = this.createData();
                    this.columnData = [
                        { title: 'No', data: 'index'},
                        { title: 'Product Name', data: 'productname'},
                        { title: 'Price', data: 'price'},
                        { title: 'Description', data: 'desc'},
                        { title: 'URL', data: 'url'},
                        { title: 'Edit', data: 'buttonEdit'},
                        { title: 'Delete', data: 'buttonDelete'},
                        { title: 'Id', visible: false,data: 'id'},
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
                            columns: this.columnData,
                        });
                    
                        $('#viewall tbody').on('click', 'a.edit', (event) => {
                            let data = table.row($(event.target).closest('tr')).data();
                            console.log("Edit event:", JSON.stringify(data));
                            // this.$router.push({ name: 'ExpertForm', params: { id: data.id } });
                        });

                        // For Delete
                        $('#viewall tbody').on('click', 'a.delete', (event) => {
                            let data = table.row($(event.target).closest('tr')).data();
                            console.log("Delete event:", JSON.stringify(data));
                            let rowid = data.id;
                            // Perform your delete operation here
                            // delete function

                        });
                    });
                }
            );
            console.log(this.allproductlist);
        },
        createData(){
            return this.allproductlist.map((prod, index) => {
                return {
                    index: index + 1,
                    productname: prod.name,
                    price: prod.price,
                    desc: prod.description,
                    url: prod.url,
                    buttonEdit:"<a class='edit'>Edit</a>",
                    buttonDelete: "<a class='delete'  data-bs-toggle='modal'>Delete</a>",
                    id: prod.id,
                }
            });
        },
        async deleteProduct(id){
            var header = {
                "Content-Type": "application/json",
                "Authorization": "bearer " + this.token,
            };
            var url = ApiConstant.DeleteProductURL + id;
            const result = await axios.delete(url, {headers: header});
            if (result.status == 200){
                // delete success
                location.reload();
            }
        }
    },
    created() {
        const reloaded = localStorage.getItem('reloadproduct');
        if (reloaded == null || reloaded !== 'true') {
            localStorage.setItem('reloadproduct', 'true');
            location.reload();
        } else{
            localStorage.setItem('reloadproduct', 'false');
        }
    }
}
</script>

<style scoped>
div.float-end button{
    border: 1px solid black;
}
main{
    margin-left: 10px;
    padding-left: 10px;
}
@media (min-width: 992px){
    main{
        margin-left: 150px;
    }
}
</style>