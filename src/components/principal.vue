<template>
    <div class="wrapper">
        <Sidebar ></Sidebar>

        <div id="content">
            <Navbar @addClass="active"/>
            <transition name="slide-fade" mode="out-in">
                <router-view/>
            </transition>
            <Footer/>     
        </div>    
    </div>
</template>
<script>
    import Sidebar from '@/components/Sidebar.vue'
    import Navbar from '@/components/Navbar.vue'
    import Footer from '@/components/Footer.vue'

export default {
    components:{
        Sidebar,
        Navbar, 
        Footer
    },
    data() {
        return {
        }
    },
    methods:{
        active(){
            let sidebar = document.getElementById("sidebar");
            sidebar.classList.toggle("active");
        }
    }
    
}
</script>

<style>
.wrapper {
    display: flex;
    width: 100%;
    align-items: stretch;
    position: absolute;
}

#content {
    width: 100%;
    padding: 20px;
    min-height: 100vh;
    transition: all 0.3s;
  }
</style>