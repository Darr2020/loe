import Vue from 'vue'
import Vuex from 'vuex'

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
    pathSearch: false,
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
    changeNav(state){
      state.pathSearch = true;      
      /*if (this.$route.path == '/busqueda') {
        alert('busqueda')
        state.pathSearch = true
        console.log(state.pathSearch)
      } else {
        alert('no')
      }*/

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
