<template>
  <div>
    <NavBar/>
    <AnalisisInversion/>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import AnalisisInversion from '@/components/AnalisisInversion.vue';

export default {
  name: 'AnalisisInversionView',
  components:{
      AnalisisInversion,
      NavBar
  }
}

</script>