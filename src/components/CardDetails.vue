<template>

    <div>

        <div class="game-details">
            <div>
                <img :src="game.thumbnail" :alt="game.title" class="game-thumbnail">
            
            </div>


            
            <div class="game-description">
                <h2>{{ game.title }}</h2>
                <p>{{ game.short_description }}</p>
                
                <div class="game-details-info">
                    <div class="game-utils">
                    <p>Genre: {{ game.genre }}</p>
                        <p>Platform: {{ game.platform }}</p>
                    </div>
                    <div class="game-create">
                        <p>Developer: {{ game.developer }}</p>
                        <p>Publisher: {{ game.publisher }}</p>
                        <p>Release Date: {{ game.release_date }}</p>
                    </div>
                    
                </div>
            </div>
           
        </div>

        <div class="game-choice">
            <router-link to="/" class="router-link-no-style">
            <i class="fa-solid fa-house"></i><i class="fa-solid fa-arrow-left fa-xl"></i>
            </router-link>
            <a :href="game.game_url" class="play-button">Play <i class="fa-solid fa-gamepad fa-xl"></i></a>
        </div>
    
    </div>
        

  </template>
  
  <script>

  import getUniqueGameData from '@/services/api/uniqueGameAPI';
  
  export default {
    name: 'CardDetails',
    data() {
      return {
        game: [],
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

    .game-details{
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        padding:1rem;
        background-color: rgb(15, 3, 44);
        box-shadow: 0.1rem .2rem .4rem rgba(13, 230, 219, 0.295);
        margin:2rem;
    }

    h2{
        font-size: 2.3rem;
        font-family: Orbitron;
        color: #9629c9;
        text-shadow: 0.1rem .2rem .3rem rgba(0, 162, 255, 0.603);
        text-transform: uppercase;
        text-align: center;
    }

    .game-description{

        text-align: start;
        margin: 0 1.5rem;
    }
   
    .game-thumbnail {
        margin-top: 3rem;
        object-fit: contain;
        box-shadow: 0.1rem .2rem .4rem rgba(13, 230, 219, 0.295);
    }

    .game-details-info{
        display: flex;
        justify-content: space-between;
    }

    .game-choice{
        display: flex;
        justify-content: space-around;
    }

    .router-link-no-style {
        color: inherit;
        text-decoration: none;
    }

    .router-link-no-style:hover{
        color: #2eb7eb;
    }

    .router-link-no-style i{
        margin:0.1rem;
        font-size: 2.5rem;
    }

    .play-button {
    display: inline-block;
    padding: 10px 20px;
    background-color:  #2eb7eb;
    color: #fff;
    text-decoration: none;
    font-weight: bold;
    border-radius: 5px;
    margin:1rem;
    transition: all 0.2s ease;
    }

    .play-button:hover{
        scale: 1.05;
        background-color:  rgba(155, 106, 165, 0.835);
    }

  
  
  </style>