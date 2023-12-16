<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
            <button class="navbar-toggler me-2" type="button"  aria-controls="offcanvasExample">
                    <span class="navbar-toggler-icon" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample"></span>
            </button>

            <a class="navbar-brand fw-bold me-auto" href="#">CatViP</a>

            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                <ul class="navbar-nav mb-2 mb-lg-0">
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <i class="bi bi-person-fill"></i>
                        </a>
                        <ul class="dropdown-menu dropdown-menu-end">
                            <li><router-link :to="{name: 'EditProfile'}" class="hyperlink"> 
                                <a class="dropdown-item" href="#">Edit profile</a>
                            </router-link>
                            </li> 
                            <li><hr class="dropdown-divider"></li>
                            <li><a class="dropdown-item"  v-on:click="logout">Logout</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <!-- OFFCANVAS -->
    <div class="offcanvas offcanvas-start sidebar-nav" 
         tabindex="-1" 
         id="offcanvasExample" 
         aria-labelledby="offcanvasExampleLabel"
         data-bs-backdrop="false"
    >
        <div class="offcanvas-header">
            <h3 class="offcanvas-title" id="offcanvasExampleLabel">CatViP</h3>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body p-0">
           <nav class="navbar">
                <ul class="navbar-nav">
                    <li class="p-1 my-1 display">
                        <router-link to="/" class="hyperlink"> 
                            <a class="nav-link px-2" active>
                                <span class="me-2"><i class="bi bi-speedometer"></i>&nbsp; <span>Dashboard</span></span>
                            </a>
                        </router-link>
                    </li>
                    <li class="p-1 my-1 display">
                        <a class="nav-link px-3 sidebar-link"
                           data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
                            <span class="me-2"><i class="bi bi-mortarboard-fill"></i></span>
                            <span>Expert</span>
                            <span class="right-icon ms-auto">
                                <i class="bi bi-chevron-down"></i>
                            </span>
                        </a>
                        <div class="collapse" id="collapseExample">
                            <ul class="navbar-nav ps-3">
                                <li>
                                    <router-link :to="{name: 'Expert'}" class="hyperlink"> 
                                    <a class="nav-link px-2" active>
                                        <span class="me-2"><i class="bi bi-mortarboard-fill"></i>&nbsp; <span>All application </span></span>
                                    </a>
                                    </router-link>  
                                </li>
                                <li>
                                    <router-link :to="{name: 'ExpertPending'}" class="hyperlink"> 
                                    <a class="nav-link px-2" active>
                                        <span class="me-2"><i class="bi bi-alarm"></i>&nbsp; <span>Pending application </span></span>
                                    </a>
                                    </router-link>  
                                </li>
                            </ul>
                        </div>
                    </li>
                    
                    



                    <li class="p-1 my-1 display">
                        <router-link to="/post/allpost" class="hyperlink">
                        <a class="nav-link px-2" active>
                            <span class="me-2"><i class="bi bi-exclamation-triangle-fill"></i>&nbsp; <span>Post reporting </span></span>
                        </a>
                        </router-link>
                    </li>
                </ul>
           </nav>

        </div>

    </div>

</template>

<script>
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
export default {
    name: 'Navbar',
    mounted(){
        let user = localStorage.getItem('token');
        if (!user){
           this.$router.push({name: 'Login'});
        }
    },
    methods: {
        logout(){
            localStorage.removeItem('token');
            localStorage.removeItem('isSeller');
            this.$router.push({name: 'Login'});
        }

    },
}
</script>


<style scoped>

:root{
    --offcanvas-width: 270px;
    --topNavbarHeight: 46px;
}
.p-1.my-1.display{
    font-size: 20px;
}
.p-1.my-1.display:hover{
    color:darkslategray;
}
.offcanvas.offcanvas-start.sidebar-nav{
    width: var(--offcanvas-width);
}
.hyperlink{
    text-decoration: none;
}
.sidebar-link{
    display: flex;
    align-items: center;
}
.sidebar-link .right-icon{
    display: inline-flex;
    transition: all ease 0.25s;
}

.sidebar-link[aria-expanded='true'] .right-icon{
    transform: rotate(180deg);
}

@media (min-width: 992px){
    body{
        overflow: auto !important;
    }
    
    .offcanvas-header{
        display: none;
    }
    .offcanvas.offcanvas-start.sidebar-nav{
        transform: none;
        visibility: visible !important;
        top: 56px;
        height: calc(100% - var(--topNavbarHeight));
    }
}
</style>