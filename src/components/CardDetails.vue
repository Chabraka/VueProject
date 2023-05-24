<template>
    <router-link to="/" class="router-link-no-style">
      <i class="fa-solid fa-arrow-left"></i>
    </router-link>
    <div class="card-detail" v-if="game">
      <img :src="game.thumbnail" :alt="game.title">
      <h2>{{ game.title }}</h2>
      <p>{{ game.description }}</p>
      <!-- Ajoutez d'autres éléments pour afficher les détails du jeu -->
      <i class="fa-solid fa-gamepad"></i>
    </div>
  </template>
  
  <script>
  import getUniqueGameData from '@/services/api/uniqueGameAPI';
  
  export default {
    name: 'CardDetails',
    data() {
      return {
        game: null
      };
    },
    created() {
      this.retrieveUniqueGameData();
    },
    methods: {
      async retrieveUniqueGameData() {
        this.game = await getUniqueGameData(this.$route.params.id);
      },
    },
  };
  </script>
  
  <style scoped>
  .card-detail {
    /* Ajoutez du style pour la mise en page des détails du jeu */
  }

  .router-link-no-style {
        color: inherit;
        text-decoration: none;
    }
   
  
  </style>