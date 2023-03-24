<template>

    <div class="gallery-options">

        <!--<div class="filter">
            <label for="dog-sort"> Trier par : </label>
            <select v-model="dogsSortType" id="dog-sort">
                <option value="AZName">Noms de A à Z</option>
                <option value="ZAName">Noms de Z à A</option>
                <option value="AZBreed">Espèces de A à Z</option>
                <option value="ZABreed">Espèces de Z à A</option>
            </select>
        </div>-->

        <div class="search-bar">
            <i class="fa-solid fa-magnifying-glass"></i>
            <input type="text" v-model="search" placeholder="Rechercher un jeu...">
            <span v-if="search" @click="cleanSearch">X</span>
            <i v-if="search && searchingList.length >= 1 ">
            {{searchingList.length}} résultat<i v-if="searchingList.length >= 2">s </i>
            </i>
        </div>

       

        <ul class="display">
            <li>
                <i @click="gridView = true" class="fa-solid fa-grip fa-xl"></i>
            </li>
            <li>
                <i @click="gridView = false" class="fa-solid fa-list fa-xl"></i>
            </li>
        </ul>

        
       

       

                
       
    </div>


    <div class="games-gallery">

        <GameCard 
            v-for="game in searchingList" 
            :key="game.id"
            :title="game.title"
            :thumbnail="game.thumbnail"
            :short_description="game.short_description"         
        />
    
             
    </div>

    <div v-if="searchingList.length == []">
        <h2>Oups</h2>
        <p>Aucun résultat trouvé</p>

    </div>
  
  
  </template>
  
  <script>
  
    import { getGamesData } from '@/services/api/gamesAPI';
  
    import GameCard from './GameCard.vue';
  
    export default {
    name : 'GamesGallery',
  
    components : {
        GameCard,
    },
  
    data() {
        return {
            gamesData : [],
            search:'',
            gridView: true,
        }
    },

    computed: {
        searchingList(){
            return this.gamesData.filter((gamesData) => {
                return gamesData.title.toLowerCase().includes(this.search.toLowerCase());
            })
        },
    },

    created: function(){
        this.retrieveGamesData()
    },
  
    methods: {
      
        async retrieveGamesData(){
            this.gamesData = await getGamesData()
            console.log(this.gamesData)
        },
        
        cleanSearch:function(){
            this.search = '' 
		}
    },
  
  };
 

  </script>
  
  <style scoped>
  
   

   .games-gallery{
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
    }
    .gallery-options{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        align-items: center;
        background-color: rgb(1, 1, 10);
    }


    .search-bar>.fa-solid{
        color: rgba(165, 10, 196, 0.835);
        position: relative;
        left: 3.5rem;
    }

    span{
        position: relative;
        right: 1.3rem;
        color:#2eb7eb;
        cursor: pointer;
    }

    input{
        height: 2rem;
        width: 15rem;
        padding-left: 1.6rem;
        border-radius: 5px;
        border: 2px solid rgba(165, 10, 196, 0.835);
        margin: 2rem;
    }
    
    input:focus {
        outline: none;
        border: 2px solid #2eb7eb;
    }


    .display {
        display: flex;
        font-size: 24px;

    }
    .display li {
        list-style: none;
        margin: 1rem;
    }
    .display i {
    transition: 0.25s;
    cursor: pointer;
    }
    .display i:hover {
    color: #2eb7eb;
    }
    
  </style>