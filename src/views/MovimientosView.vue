<template>
  <div>
    <NavBar/>
    <Movimientos/>
  </div>
</template>

<script>

import Movimientos from '@/components/Movimientos.vue';
import NavBar from '@/components/NavBar.vue';

export default{
  name:'MoviemientosView',
  components: {
    Movimientos,
    NavBar
  }
}

</script>