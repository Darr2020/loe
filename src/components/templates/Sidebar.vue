<!--template>
  <div>
    <nav id="sidebar" class="active">
      <div class="sidebar-header">
        <h3>Libro de Oportunidades</h3>
      </div>
      <ul class="components">
        <h4 class="text-center">FILTRAR</h4>
        <li>
          <a>
            <b-form-checkbox value="state">
              Por estado
            </b-form-checkbox>
          </a>
        </li>
        <li>
          <a>
            <b-form-checkbox value="municipality">
              Por municipio
            </b-form-checkbox>
          </a>
        </li>
        <li>
          <a>
            <b-form-checkbox value="parish">
              Por parroquía
            </b-form-checkbox>
          </a>
        </li>
        <li>
          <a>
            <b-form-checkbox value="populatedCenter">
              Por centro poblado
            </b-form-checkbox>
          </a>
        </li>   
      </ul>
    </nav>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        
    }
  },
}
</script>

<style>
/* ---------------------------------------------------
    SIDEBAR STYLE
----------------------------------------------------- */
#sidebar {
  min-width: 250px;
  max-width: 250px;
  background: #C22974;
  color: #fff;
  transition: all 0.3s;
  height: 100%;
  box-shadow: 3px 3px 3px rgba(0, 0, 0, .3);
}

#sidebar.active { margin-left: -250px; }

#sidebar .sidebar-header {
  padding: 20px;
  box-shadow: 3px 3px 3px rgba(0, 0, 0, .3);
  background: #F3BD19;
}

#sidebar ul.components { padding: 20px 0; }

#sidebar ul li button{ width: 100%; }

#sidebar ul li a, 
#sidebar ul li button{
  padding: 10px;
  font-size: 1.1em;
  display: block;
  text-decoration: none;
  color:#fff;
}

#sidebar ul li a:hover,
#sidebar ul li button:hover {
  color: rgb(192, 75, 132);
  background: #fff;
}

.dropdown-toggle::after {
    display: block;
    position: absolute;
    top: 50%;
    right: 20px;
    transform: translateY(-50%);
}

.collapse > li > a {
    font-size: .95em !important;
    padding-left: 30px !important;
    background: rgb(187, 54, 118);
}
/* ---------------------------------------------------
    MEDIAQUERIES
----------------------------------------------------- */

@media (max-width: 768px) {
    #sidebar {
        margin-left: -250px;
    }
    #sidebar.active {
        margin-left: 0;
    }
    #sidebarCollapse span {
        display: none;
    }
}

</style-->


<template>
  <div>
    <nav id="sidebar" class="active">
      <div class="sidebar-header">
        <h3>Libro de Oportunidades</h3>
      </div>
      <ul class="components">
        <h4 class="text-center">FILTRAR</h4>
        <li>
          <a @click="check()">
            <b-form-checkbox v-model="check_state" value="no" unchecked-value="yes">
              Por estado
            </b-form-checkbox>
          </a>
          <select v-show="input" :size="states.length" v-model="filter_state" @change="emitStates()" multiple>
            <option v-for="state in states" :key="state.id" v-text="state.nombre"></option>
          </select>
        </li>
        <li>
          <a>
            <b-form-checkbox value="municipality">
              Por municipio
            </b-form-checkbox>
          </a>
        </li>
        <li>
          <a>
            <b-form-checkbox value="parish">
              Por parroquía
            </b-form-checkbox>
          </a>
        </li>
        <li>
          <a>
            <b-form-checkbox value="populatedCenter">
              Por centro poblado
            </b-form-checkbox>
          </a>
        </li>   
      </ul>
    </nav>
  </div>
</template>
<script>

import EventBus from '../../bus'
import axios from 'axios'
  export default {
    
    data() {
      return {
        input: false,
        check_state: 'yes',
        states: [],
        filter_state: []       
      }
    },
    methods: {
      check() {
        if (this.check_state == 'yes') {
          this.input = true;
        } else {
          this.input = false;
          this.filter_state = ['not'];
          this.emitStates();
        }
      },
      emitStates(){
        EventBus.$emit('data_filter',this.filter_state);
      },
      async getStates(){            
            try {
                const response = await axios.get('http://loe.terna.net/api-v1/estado/listar/')

                if (response.data.results.length == 0) {
                    this.messageNull = 'Disculpe, en estos momentos no hay carreras registradas'
                }else{
                    this.states = await response.data.results;
                }
            } catch (error) {
                console.log('error', error);    
            }
        }
    },
    mounted () {
      this.getStates();
    }

}
</script>

<style>
/* ---------------------------------------------------
    SIDEBAR STYLE
----------------------------------------------------- */
#states {
  font-size: 15px;
}

#sidebar {
  min-width: 250px;
  max-width: 250px;
  background: #C22974;
  color: #fff;
  transition: all 0.3s;
  height: 100%;
  box-shadow: 3px 3px 3px rgba(0, 0, 0, .3);
}

#sidebar.active { margin-left: -250px; }

#sidebar .sidebar-header {
  padding: 20px;
  box-shadow: 3px 3px 3px rgba(0, 0, 0, .3);
  background: #F3BD19;
}

#sidebar ul.components { padding: 20px 0; }

#sidebar ul li button{ width: 100%; }

#sidebar ul li a, 
#sidebar ul li button{
  padding: 10px;
  font-size: 1.1em;
  display: block;
  text-decoration: none;
  color:#fff;
}

#sidebar ul li a:hover,
#sidebar ul li button:hover {
  color: rgb(192, 75, 132);
  background: #fff;
}

.dropdown-toggle::after {
    display: block;
    position: absolute;
    top: 50%;
    right: 20px;
    transform: translateY(-50%);
}

.collapse > li > a {
    font-size: .95em !important;
    padding-left: 30px !important;
    background: rgb(187, 54, 118);
}
/* ---------------------------------------------------
    MEDIAQUERIES
----------------------------------------------------- */

@media (max-width: 768px) {
    #sidebar {
        margin-left: -250px;
    }
    #sidebar.active {
        margin-left: 0;
    }
    #sidebarCollapse span {
        display: none;
    }
}

</style>