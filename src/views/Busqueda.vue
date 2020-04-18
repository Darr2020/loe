<template>
    <div>      
        <router-view></router-view>
    </div>
</template>
<script>
import navbar from '@/components/Navbar.vue'
import { mapMutations } from 'vuex'

export default {
    components: {
        navbar
    },
    methods: {
       ...mapMutations(['changeNav'])
    },
    mounted(){
       this.changeNav()
    }
}
</script>