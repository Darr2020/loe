import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

//IMPORTS BOOTSTRAP-VUE
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.min.css'

//IMPORTS LEAFLETS-MAPS
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet';
import 'leaflet/dist/leaflet.css';

// IMPORT DataTable VueJs
import { VuejsDatatableFactory } from 'vuejs-datatable';

Vue.component('l-map', LMap);
Vue.component('l-tile-layer', LTileLayer);
Vue.component('l-marker', LMarker);



Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use( VuejsDatatableFactory );

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')