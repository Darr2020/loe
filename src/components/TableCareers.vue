<template>
    <div class="row">
        <div class="col-12 text-center">
            <h1 class="h1" v-if="!message">Todas las Universidades</h1>
            <h1 class="h1" v-else>{{ message }}</h1>
        </div>
        <div class="col-12" v-if="message">
            <div id="preloader6">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
        <div v-else class="col-12">
            <div class="col-12 form-inline">
                <input type="text" class="form-control" v-model="filter" placeholder="Buscar carreras">
            </div>

            <vue-good-table
                title="Universidades"
                id="table"
                :columns="columns"
                :rows="rows"
                @on-cell-click="onCellClick"
                styleClass="table condensed table-bordered table-hover"
                :search-options="{
                    enabled: true,
                    trigger: 'enter',
                    skipDiacritics: true,
                    placeholder: 'Buscar carreras',
                    externalQuery: filter,
                    searchFn: myFunc
                }"
                :pagination-options="{
                    enabled: true,
                    mode: 'records',
                    perPageDropdown: [5, 10, 25],
                    perPage: 25,
                    dropdownAllowAll: false,
                    nextLabel: 'Siguiente',
                    prevLabel: 'Anterior',
                    rowsPerPageLabel: 'Filas por página',
                    ofLabel: 'de',
                }">
            </vue-good-table>

            <ModalUniversity
                v-if="university != ''"
                :university="university">
            </ModalUniversity>
        </div>

    </div>
</template>
<script>

import ModalUniversity from '@/components/ModalUniversity.vue'
import EventBus from '../bus'
import axios from 'axios'
export default {
     data() {
        return {
            filter: '',
            bus: true,
            message: '',
            university: [],
            rows: [],
            rowsData: [],
            columns: [
                {label: 'Nombre', field: 'nombre', filterable: true},
                {label: 'Título', field: 'titulo', filterable: true, html: false},
                {label: 'Universidad', field: 'localidad.ieu.nombre', filterable: true, html: true},
                {label: 'Localidad', field: 'localidad.estado', filterable: true, html: false}
            ],
        }
    },
    components: {
        ModalUniversity
    },    
    methods: {
        myFunc(row, col, cellValue, searchTerm){
            return cellValue === 'my value';
        },
         onCellClick(params) {
            this.university = params.row;
            this.$bvModal.show('university')
        },
        events (me,rowsData) {

            EventBus.$on('state_filter', function (states) {
                if (states[0] != undefined) {                            
                    var attr = 'data[i].localidad.estado';
                    me.bus = false;
                    me.rows = me.filters(me.rowsData, states,attr);

                } else if (states[0] == undefined) {
                    me.bus = true;
                    me.rows = me.rowsData;
                }
            });

            EventBus.$on('municipality_filter', function (municipality) {
                if (municipality[0] != undefined) {
                    var attr = 'data[i].localidad.municipio';                           
                    me.bus = false;                            
                    me.rows = me.filters(me.rowsData, municipality, attr);
                }
            });

            EventBus.$on('parish_filter', function (parish) {
                if (parish[0] != undefined) {
                    var attr = 'data[i].localidad.parroquia';                            
                    me.bus = false;                            
                    me.rows = me.filters(me.rowsData, parish, attr);
                }
            });

        },
        filters(data, obj,atribute) {

            let array = [];
            let attr = atribute;

            for (var j = 0; j < obj.length; j++) 
            {
                for (var i = 0; i < data.length; i++) 
                {
                    if (eval(attr) == obj[j]) 
                    {                        
                        array.push(data[i]);
                    }                              
                }
            }

            return array;

        },
        async getInstitutions(url, institutions){            
            try {
                const response = await axios.get(url)

                if (response.data.results.length == 0) {

                    this.messageNull = 'Disculpe, en estos momentos no hay carreras registradas'
                
                }else{

                    var me = this;
                    const retrivedInstitutions = institutions.concat(response.data.results)
                    
                    if (response.data.next !== null && institutions.length !== 1000) {
                        me.getInstitutions(response.data.next, retrivedInstitutions);
                        me.message = 'Cargando los registros, por favor espere... resultados: ' +retrivedInstitutions.length;
                    } else {
                        me.rowsData = retrivedInstitutions
                        me.message = '';
                    }

                    me.rowsData = retrivedInstitutions
                    me.events(me,me.rowsData);
                    if (me.bus) me.rows = me.rowsData;

                }

            } catch (error) {
                console.log('error', error);    
            }
        },
    },
    created() {
        this.getInstitutions('http://loe.terna.net/api-v1/programa-academico/pre-grado/listar/', []);
    },
    mounted(){        
    }    
}
</script>

<style scoped>
    *{
        font-size: 13px;
    }
    .h1 {
        font-size: 20px !important;
        background: beige;
        font-weight: bold;
        padding: 10px;
    }
    #table {
        cursor: pointer
    }
    /* Animaciones de carga */
    #preloader6{
        position:relative;
        width: 10vh;
        height: 10vh;
        margin: 3% 50% 3% 50%;
        animation: preloader_6 5s infinite linear;
    }
    #preloader6 span{
        width:20px;
        height:20px;
        position:absolute;
        background:red;
        display:block;
        animation: preloader_6_span 1s infinite linear;
    }
    #preloader6 span:nth-child(1){
    background:#2ecc71;
    
    }
    #preloader6 span:nth-child(2){
    left:22px;
    background:#9b59b6;
        animation-delay: .2s;
    
    }
    #preloader6 span:nth-child(3){
    top:22px;
    background:#3498db;
        animation-delay: .4s;
    }
    #preloader6 span:nth-child(4){
    top:22px;
    left:22px;
    background:#f1c40f;
        animation-delay: .6s;
    }
    @keyframes preloader_6_span {
    0% { transform:scale(1); }
    50% { transform:scale(0.5); }
    100% { transform:scale(1); }
    }
</style>