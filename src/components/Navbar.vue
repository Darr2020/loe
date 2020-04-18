<template>
    <div>
        <nav class="navbar navbar-expand-lg ">
            <b-container fluid>
                <b-button variant="outline-light" @click="addClass">
                    <span v-if="icon == true">
                        <b-icon-chevron-left></b-icon-chevron-left>
                    </span>
                    <span v-else>
                        <b-icon-chevron-right></b-icon-chevron-right>
                    </span>
                </b-button>
                <b-navbar-nav v-if="pathSearch == true" class="mr-auto">
                       <InputSearch class="SearchMap"/>
                </b-navbar-nav>
                <b-navbar-nav class="ml-auto">  
                    <b-link to="/">Sistema Nacional de Ingreso</b-link>
                </b-navbar-nav>
            </b-container>
        </nav>
    </div>
</template>
<script>
    import InputSearch from '@/components/busqueda/InputSearch.vue'
    import { mapState } from 'vuex'
    export default {
        components:{
            InputSearch,
        },
        data() {
            return {
                icon: true
            }
        },
        methods:{
            addClass(){            
                this.$emit('addClass');
                this.icon = false;
            }
        },
        computed: {
            ...mapState(['pathSearch'])
        }
    }
</script>

<style>
.navbar {
    padding: 15px 15px;
    height: 55px;
    background: #2da7db;
    border: none;
    border-radius: 0;
    margin-bottom: 40px;
    box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.2);
}

.navbar-nav a{ 
    color: #fff;
    font-size: 1.19em;
    font-weight: 400;
    line-height: 1.7em;
}

.navbar-nav a:hover{ color: #fff } 
@media (max-width: 425px){
    .navbar{ height: 130px }
}

</style>