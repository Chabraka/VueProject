<template>

  <HeaderApp/>
  
  <main>

    <router-view></router-view>
        
        
  </main>

  <FooterApp/>

</template>

<script>

  import HeaderApp from './components/HeaderApp.vue'
  import FooterApp from './components/FooterApp.vue'

  export default {
    name : 'App',

    components : {
        HeaderApp,
        FooterApp
    },

  }
  

</script>

<style>

@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@600&display=swap');

#app {
    font-family: Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: rgb(162, 245, 245);
    background-color: rgb(1, 1, 29);
    min-height: 100vh;
  }

  

</style>