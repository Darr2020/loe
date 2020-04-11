<template>
  <div class="home">
   <CardsHome/>  
   <Map></Map>
  </div>
</template>

<script>

import CardsHome from '@/components/CardsHome.vue'
import Map from '@/components/Map.vue'


  export default {
    name: 'Home',
    components: {
      CardsHome,
      Map
    }
  }
</script>
