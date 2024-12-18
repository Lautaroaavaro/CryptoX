<template>
    <div>
      <NavBar/>
      <EstadoActual/>
    </div>
  </template>
  
  <script>
  import NavBar from '@/components/NavBar.vue'
  import EstadoActual from '@/components/EstadoActual.vue';
  
  export default {
    name: 'EstadoActualView',
    components:{
        EstadoActual,
        NavBar
    }
  }
  
  </script>