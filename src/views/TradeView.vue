<template>
  <div>
    <NavBar/>
    <Trade/>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import Trade from '@/components/Trade.vue'

export default {
  name: 'TradeView',
  components:{
      Trade,
      NavBar
  }
}

</script>