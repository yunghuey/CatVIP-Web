<template>

    <Navbar></Navbar>
    
    <!-- content -->
    <main class="mt-1 ms-4 pt-3">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12 fw-bold fs-3">Dashboard</div>
            </div>
            <div class="row">
                <div class="card text-bg-primary mb-3 me-4" style="max-width: 18rem;">
                    <div class="card-header">Header</div>
                        <div class="card-body">
                            <h5 class="card-title">Primary card title</h5>
                            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    </div>
                </div>
                <div class="card text-bg-primary mb-3" style="max-width: 18rem;">
                    <div class="card-header">Header</div>
                        <div class="card-body">
                            <h5 class="card-title">Primary card title</h5>
                            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    </div>
                </div>
                
            </div>
        </div>
    </main>

</template>

<script>
import Navbar from './sidenav.vue';
import 'bootstrap/dist/css/bootstrap.min.css';
export default{
    components:{
        Navbar,
    }
}
import 'bootstrap-icons/font/bootstrap-icons.css';
</script>

<style scoped>

@media (min-width: 992px){
    
    main{
        margin-left: 280px;
    }
  
}
</style>