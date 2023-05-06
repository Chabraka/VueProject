<template>

  <header>

      <h1>Free Games</h1>
   
  </header>

  <main>
        <GamesGallery />


  </main>


</template>

<script>

  import GamesGallery from './components/GamesGallery.vue';


  export default {
    name : 'App',

    components : {
      GamesGallery,

    }
    


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

  header{
    min-height: 40vh;
    background: url(./assets/banniere_games.png) no-repeat;
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    overflow:hidden;

}

h1{
    font-size: 4.5rem;
    font-family: Orbitron;
    color: #9629c9;
    padding:5.5rem 0rem;
    text-shadow: 0.1rem .2rem .3rem rgba(0, 162, 255, 0.603);
    text-transform: uppercase;
}


 .games-gallery{
  display: flex;
  justify-content: center;
  padding-top: 3rem;
  flex-wrap: wrap;
}



  

</style>