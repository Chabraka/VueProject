<template>

    <div>

        <GalleryOptions v-model:search="search" 
        v-model:gamesSortType="gamesSortType"
        v-model:gamesFilterPlat="gamesFilterPlat"
        v-model:gamesFilterGenre="gamesFilterGenre"
        :gamesFilteredGenreData="gamesFilteredGenreData"
        v-model:gridView="gridView"
        v-model:gamesSortFavorites="gamesSortFavorites"
        @toggleSortFavorites="toggleSortFavorites"
        :favorites="favorites"
        />


        <div class="games-gallery">

            <GameCard 

                v-for="game in gamesFilteredFavoritesData" 
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

            gridView: localStorage.getItem("gridView") === 'true',
            
            gamesSortFavorites: localStorage.getItem("gamesSortFavorites") === 'false',
        }
    },

    created: function(){

        this.retrieveGamesData();

        let favoritesCookie = getCookie('favorites');
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
        },

        gamesFilteredFavoritesData: function() {
            let favoritesData = this.gamesFilteredGenreData;
            if (this.gamesSortFavorites === true) {
                favoritesData = favoritesData.filter(game => this.favorites.includes(game.id));
            }
            return favoritesData;
        },
        
    },

  
    methods: {
        
        async retrieveGamesData(){
            this.gamesData = await getGamesData()
        },

        
        toggleLike(gameId) {
            console.log(document.cookie);
            const game = this.gamesFilteredGenreData.find(game => game.id === gameId);
            if (game) {                
                if (!this.isGameLiked(game.id)) {
                    this.favorites.push(game.id);
                }
                else {
                    const index = this.favorites.indexOf(game.id);
                    if (index !== -1) {
                        this.favorites.splice(index, 1);
                    }
                }
                setCookie('favorites', JSON.stringify(this.favorites), 30);
                console.log(document.cookie);
            }
        },

        toggleSortFavorites() {
            this.gamesSortFavorites = !this.gamesSortFavorites;
            localStorage.setItem("gamesSortFavorites", this.gamesSortFavorites);
        },

        
        isGameLiked(gameId) {
            return this.favorites.includes(gameId);
        },
      
        
    },
}
 
  </script>
  
  <style scoped>

    .games-gallery{
    display: flex;
    justify-content: center;
    padding-top: 3rem;
    flex-wrap: wrap;
    }
    
  </style>