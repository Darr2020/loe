<template>
    <div>
        <b-modal id="parish" scrollable title="Filtros por parroquia"
          @ok="emitParishs()">
            <b-form-group label="Parroquias:">
                <br>
                <b-form-checkbox
                  v-for="parish in parishs"
                  v-model="filter_parish"
                  :key="parish.id"
                  :value="parish.nombre"
                  name="parish"
                  switch
                >
                  {{ parish.nombre }}
                </b-form-checkbox>

            </b-form-group>
        </b-modal>
    </div>
</template>
<script>

import EventBus from '../../bus'
import axios from 'axios'
  export default {
    props: ['parishs'],   
    data() {
      return {
        filter_parish: [],

      }
    },
    methods: {
      emitParishs() {

        if (this.filter_parish){
          this.$emit('pariData', this.filter_parish);
        }

      }      
    },
}
</script>