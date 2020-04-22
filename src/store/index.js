import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'

Vue.use(Vuex)

const movies = () => {
  return [{
    id: 1,
    title: 'titulo1',
    description: 'pelicula1',
    available: true,
  },
  {
    id: 2,
    title: 'titulo2',
    description: 'pelicula2',
    available: false,
  }]
}

export default new Vuex.Store({
  state: {
    inputSearch: false,
    movies: movies(),
    filter: {
      query: '',
      available: true
    }
  },
  mutations: {
    SET_QUERY(state, query){
      state.filter.query = query;
    },
    SET_AVAILABLE(state){
      state.filter.available = ! state.filter.available;
    },
    showInputNav(state){
      state.inputSearch = true    
    },
    hideInputNav(state){
      state.inputSearch = false;    
    }
  },
  getters: {
    filteredMovies(state){
      let movies = state.movies.filter(movie => movie.available === state.filter.available);

      if (state.filter.query.length > 2) {
        return movies.filter(movie => movie.title.toLowerCase().includes(state.filter.query))
      }
      return movies;
    }
  },
  actions: {
  },
  modules: {
  }
})
