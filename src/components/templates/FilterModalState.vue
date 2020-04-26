<template>
    <div>
        <b-modal id="state" scrollable title="Filtros por estado"
          @ok="emitStates()">
            <b-form-group label="Estados:">
                <br>
                <b-form-checkbox
                  v-for="state in states"
                  v-model="filter_states"
                  :key="state.id"
                  :value="state.nombre"
                  name="states"
                  switch
                >
                  {{ state.nombre }}
                </b-form-checkbox>

            </b-form-group>
        </b-modal>
    </div>
</template>
<script>

import EventBus from '../../bus'
import axios from 'axios'
  export default {
    props: ['states','municipality','parish'],   
    data() {
      return {
        filter_states: [],
        matriz: []
      }
    },
    methods: {
      emitStates(){

        let self = this;
        
        if (self.matriz) 
        {
          self.matriz = [];
          self.matriz.push(self.filter_states,self.municipality,self.parish);
        }

        EventBus.$emit('states_filter',self.matriz);

        if (self.filter_states){
  
          let id_states = [];

          for (var j = 0; j < self.filter_states.length; j++) {

            for (var i = 0; i < self.states.length; i++) {
              if(self.states[i].nombre == self.filter_states[j]) 
              { 
                id_states.push(self.states[i].id)
              }
            }

          }

          self.$emit('enable', id_states);
        }

      },
    }
}
</script>