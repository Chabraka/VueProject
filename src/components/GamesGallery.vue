<template>

    <GalleryOptions v-model:search="search" 
    v-model:gamesSortType="gamesSortType"
    v-model:gamesFilterPlat="gamesFilterPlat"
    v-model:gamesFilterGenre="gamesFilterGenre"
    :gamesFilteredGenreData="gamesFilteredGenreData"
    v-model:gridView="gridView"
    />


    <div class="games-gallery">

        <GameCard 

            v-for="game in gamesFilteredGenreData" 
            :key="game.id"
            :id="game.id"
            :title="game.title"
            :thumbnail="game.thumbnail"
            :short_description="game.short_description"  
            :genre="game.genre"
            :platform="game.platform"

            @toggleLike="toggleLike(game.id)" 
            :isLiked="isGameLiked(game.id)"
       

            :gridView="gridView"
            
        />
    
             
    </div>


    <div v-if="search && searchingList.length == []">
        <h2>Oups</h2>
        <p>Aucun résultat trouvé</p>

    </div>

    <div v-if="!search && searchingList.length == []">
        <h2>Loading ...</h2>
        <i class="fas fa-spinner fa-pulse fa-xl"></i>

    </div>
  
  
  </template>
  
  <script>

    import { getCookie, setCookie } from '@/services/cookies/cookieUtils';
  
    import { getGamesData } from '@/services/api/gamesAPI';

    

    import GalleryOptions from './GalleryOptions.vue'
    import GameCard from './GameCard.vue';
  
    export default {
    name : 'GamesGallery',
  
    components : {
        GameCard,
        GalleryOptions
    },

    data() {
        return {
            gamesData : [],

            favorites : [],

            search: localStorage.getItem("search") || "",
			gamesSortType: localStorage.getItem("gamesSortType") || "default",
            gamesFilterPlat: localStorage.getItem("gamesFilterPlat") || "All",
            gamesFilterGenre: localStorage.getItem("gamesFilterGenre") || "default",

            gridView: localStorage.getItem("gridView") === "true",
           
        }
    },

    

    created: function(){

        this.retrieveGamesData();

        const favoritesCookie = getCookie('favorites');
        if (favoritesCookie) {
            this.favorites = JSON.parse(favoritesCookie);
        }

    },

    computed: {
        searchingList(){
            return this.gamesData.filter((gamesData) => {
                return gamesData.title.toLowerCase().includes(this.search.toLowerCase());
            })
        },
        
        gamesOrganizedData: function() {
            let sortedData = this.gamesData.slice()
            const field = ["AZName", "ZAName"].includes(this.gamesSortType) ? "title" : ["RecenttoOld", "OldtoRecent"].includes(this.gamesSortType) ? "release_date" : ["default"].includes(this.gamesSortType);
            const reversed = ["ZAName", "OldtoRecent"].includes(this.gamesSortType)
            sortedData = this.searchingList.slice().sort((a, b) => {
                if (field === "title") {
                return a[field].localeCompare(b[field])
                } else if (field === "release_date") {
                return Date.parse(a[field]) - Date.parse(b[field])
                }
            })
            if (reversed) sortedData = sortedData.reverse()
            return sortedData

        },

        gamesFilteredPlatData: function() {        
            let filteredData = this.gamesOrganizedData;
            console.log(this.gamesFilterPlat)
            if (this.gamesFilterPlat !== 'All') {
                filteredData = filteredData.filter(item => item.platform === this.gamesFilterPlat);
            }
            return filteredData;
        },

        gamesFilteredGenreData: function() {
        let filteredData = this.gamesFilteredPlatData;
        if (this.gamesFilterGenre !== 'default') {
            filteredData = filteredData.filter(game => game.genre === this.gamesFilterGenre);
        }
        return filteredData;
        }
    },

  
    methods: {
      
        async retrieveGamesData(){
            this.gamesData = await getGamesData()
        },

        isGameLiked(gameId) {
            return this.favorites.includes(gameId);
        },

        toggleLike(gameId) {
            const game = this.gamesFilteredGenreData.find(game => game.id === gameId);
            if (game) {
                game.isLiked = !game.isLiked;
                
                if (game.isLiked) {
                    this.favorites.push(game.id);
                } else {
                    const index = this.favorites.indexOf(game.id);
                    if (index !== -1) {
                        this.favorites.splice(index, 1);
                    }
                }
                //const isliked = Boolean(!game.isLiked);
                //console.log(this.isLiked);
                setCookie('favorites', JSON.stringify(this.favorites), 30);
                
                console.log(document.cookie);
                /*var Cookies = document.cookie.split(';');
                // set past expiry to all cookies
                for (var i = 0; i < Cookies.length; i++) {
                document.cookie = Cookies[i] + "=; expires="+ new Date(0).toUTCString();
                }*/
            }
        },
        
    },
  }
 
  </script>
  
  <style scoped>
   .games-gallery{
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
    }
    
  </style>