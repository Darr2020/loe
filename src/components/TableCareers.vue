<template>
    <div class="row">
        <div class="col-xs-12 form-inline">
            <form class="form-group">
                <input type="text" class="form-control" v-model="filter" placeholder="Buscar carreras" @keydown="$event.stopImmediatePropagation()">
            </form>
        </div>

        <div class="col-xs-12 table table-hover table-responsive">
            <datatable :columns="columns" :data="rows" :filter="filter" :per-page="15"></datatable>
            <datatable-pager v-model="page"></datatable-pager>
        </div>
    </div>
</template>
<script>

import EventBus from '../bus'
import axios from 'axios'
export default {
     data() {
        return {
            filter:  '',
            bus: true,
            rows: [],
            rowsData: [],
            columns: [
                {label: 'Nombre', field: 'nombre'},
                {label: 'Titulo', field: 'titulo'},
                {label: 'Universidad', field: 'localidad.ieu.nombre'},
                {label: 'Localidad',  representedAs: row => 
                                        `${ row.localidad.estado },
                                        ${ row.localidad.municipio }, 
                                        ${ row.localidad.parroquia }`,
                                        align: 'left',sortable: false},
            ],
            page: 1,
            apiRequests: [],
        }
    },    
    methods: {
        filters(data, states) {

            let array = [];
            console.log(states)

            for (var j = 0; j < states.length; j++) {

                for (var i = 0; i < data.length; i++) {
                    if (data[i].localidad.estado == states[0][j]) 
                    {
                        if (states[1][j] != undefined) 
                        {
                            if (data[i].localidad.municipio == states[1][j]) 
                            {
                                if (states[2][j] != undefined) 
                                {
                                    if (data[i].localidad.parroquia == states[2][j]) 
                                    {
                                        array.push(data[i]);
                                    }
                                } else {
                                    array.push(data[i]);
                                }
                            }
                        } else {
                            array.push(data[i]);
                        }
                    }
                }

            }

            return array;

        },
        async getInstitutions(){            
            try {
                const dates = await axios.get('http://loe.terna.net/api-v1/programa-academico/pre-grado/listar/')

                if (dates.data.results.length == 0) {
                    this.messageNull = 'Disculpe, en estos momentos no hay carreras registradas'
                }else{
                    // Se debe declarar me=this desde afuera del EnvenBus
                    // ya que pertenecen a distintos contexto
                    var me = this;
                    me.rowsData = await dates.data.results;

                    if (me.bus) {
                        me.rows = me.rowsData;
                    }

                    EventBus.$on('states_filter', function (states) {
                        if (states[0][0] != undefined) {                            
                            me.bus = false;                            
                            me.rows = me.filters(me.rowsData, states);

                        } else if (states[0][0] == undefined) {
                            me.bus = true;
                            me.rows = me.rowsData;
                        }
                    });

                }
            } catch (error) {
                console.log('error', error);    
            }
        },
    },
    mounted(){        
        this.getInstitutions();
    }    
}
</script>
<style scoped>
    *{
        font-size: 13px;
    }    
</style>