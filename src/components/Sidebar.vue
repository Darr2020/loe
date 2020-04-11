<template>
  <div>
    <nav id="sidebar" addClass="sidebar">
      <div class="sidebar-header">
        <h3>Libro de Oportunidades</h3>
      </div>
      <ul class="components">
        <h3 class="text-center">OPSU
        </h3>
        <li> <b-link to="/">Inicio</b-link></li>
        <li> <b-link to="/about">¿Quienes somos?</b-link> </li>
        <li>
          <b-button v-b-toggle.drop1 variant="white">
            <b-row align-h="between">
              <b-col cols="8" left>Carreras y PNF</b-col>
              <b-col cols="3"><b-icon-chevron-down></b-icon-chevron-down></b-col>
            </b-row>  
          </b-button>
          <b-collapse id="drop1">
              <li> <b-link to="/">Por áreas de conocimiento</b-link> </li>
              <li> <b-link to="/">Búsqueda avanzada</b-link> </li>
              <li> <b-link to="/">Programaas de misión Sucre</b-link> </li>
          </b-collapse>
        </li>
        <li>
          <b-button v-b-toggle.drop2 variant="white">
            <b-row align-h="between">
              <b-col cols="7">Instituciones</b-col>
              <b-col cols="3"><b-icon-chevron-down></b-icon-chevron-down></b-col>
            </b-row>  
          </b-button>
          <b-collapse id="drop2">
              <li> <b-link to="/">Buscar por regiones</b-link> </li>
              <li> <b-link to="/">Buscar por estados</b-link> </li>
              <li> <b-link to="/">Búsqueda avanzada</b-link> </li>
          </b-collapse>
        </li>
        <li> <a href="#">Áreas prioritarias</a> </li>
        <li> <a href="#">Glosario</a> </li>
      </ul>

      <ul class="list-unstyled CTAs ">
          <li> <a href="#" class="contact">Contacto</a> </li>
      </ul>
    </nav>
  </div>
</template>
<script>
//import { mapState } from 'vuex'
export default {
  props: [
    "active"
  ],
  data() {
    return {
      
    }
  },
  methods: {
   sidebar(){
     
      let sidebar = document.getElementById("sidebar");
      sidebar.classList.toggle("active");
    }
  },
  computed: {
   
  },
}
</script>
<style >
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

/*a[data-toggle="collapse"] {
    position: relative;
}*/

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

ul.CTAs { padding: 20px;   
 }

ul.CTAs li .contact {
    text-align: center;
    font-size: 1.2em !important;
    display: block;
    margin-bottom: 5px;
    background: #C22974;
    border-radius: 0;
    box-shadow: 3px 3px 3px rgba(0, 0, 0, .3);
    color: #fff !important;
}

ul.CTAs li .contact:hover {
  color: #C22974 !important;
    transition: all 0.2s;

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