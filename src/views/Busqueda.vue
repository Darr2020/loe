<template>
    <div>      
        <router-view></router-view>
    </div>
</template>
<script>
import { mapMutations } from 'vuex'

export default {
    methods: {
       ...mapMutations(['showInputNav'])
    },
    mounted(){
       this.showInputNav()
    }
}
</script>