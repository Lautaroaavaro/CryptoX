<template>
  <div>
    <NavBar/>
    <Home/>
  </div>
</template>


<script>
import Home from '@/components/Home.vue';
import NavBar from '@/components/NavBar.vue';

export default {
  name: 'HomeView',
  components: {
    Home,
    NavBar
  }
}

</script>