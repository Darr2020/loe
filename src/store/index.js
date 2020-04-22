import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    inputSearch: false,
    iconNavbar: false,
  },
  mutations: {
    showInputNavCarreras(state){ // MOSTRAR INPUT PARA BUSCAR CARRERAS
      state.inputSearch = true    
    },
    hideInputNavCarreras(state){ // OCULTAR INPUT PARA BUSCAR CARRERAS  
      state.inputSearch = false;    
    },
    showInputNavInstitutions(state){ // MOSTRAR INPUT PARA BUSCAR INSTITUCIONES 
      state.inputSearch = true    
    },
    hideInputNavInstitutions(state){ // OCULTAR INPUT PARA BUSCAR INSTITUCIONES
      state.inputSearch = false;    
    }
  },
  actions: {
  },
  modules: {
  }
})
