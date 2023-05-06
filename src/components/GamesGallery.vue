<template>

    <div class="gallery-options">

        <div class="search-bar">
            <i class="fa-solid fa-magnifying-glass"></i>
            <input type="text" v-model="search" placeholder="Rechercher un jeu...">
            <span v-if="search" @click="cleanSearch">X</span>
            <i v-if="search && gamesFilteredGenreData.length >= 1 ">
            {{gamesFilteredGenreData.length}} résultat<i v-if="gamesFilteredGenreData.length >= 2">s</i>
            </i>
        </div>

        <ul class="display">
            
           <li>
                <i @click="gridViews = true" class="fa-solid fa-grip fa-xl"></i>
            </li>
            <li>
                <i @click="gridViews = false" class="fa-solid fa-list fa-xl"></i>
            </li>
            <li>
                <i @click="Favorites = true" class="fa-solid fa-heart fa-lg"></i>
            </li>

            <li class="drop-btn">
                <i @click="Filters = true" class="fa-solid fa-filter fa-lg"></i>

                <div class="drop-content">
                    <label for="game-sort">Trier par : </label>
                    <select v-model="gamesSortType" id="game-sort">
                        <option value="default"> Par défaut</option>
                        <option value="AZName"> Noms de A à Z</option>
                        <option value="ZAName"> Noms de Z à A</option>
                        <option value="RecenttoOld"> Du plus récent au plus vieux</option>
                        <option value="OldtoRecent"> Du plus vieux au plus récent</option>
                    </select>

                    <label for="game-filter-plat">Sélectionner par plateforme  : </label>
                    <select v-model="gamesFilterPlat" id="game-filter-plat">
                        <option value="All"> All</option>
                        <option value="PC (Windows)">PC (Windows)</option>
                        <option value="Web Browser"> Web Browser</option>
                    </select>

                    <label for="game-filter-genre">Sélectionner par genre: </label>
                    <select v-model="gamesFilterGenre" id="game-filter-genre">
                        <option value="default"> Par défaut</option>
                        <option v-for="cat in catData" :key="cat" :value="cat">{{cat}}</option>
                    </select>
                </div>
                
            </li>
        </ul>    
       
    </div>


    <div class="games-gallery">

        <GameCard 
            :gridView="gridViews"

            v-for="game in gamesFilteredGenreData" 
            :key="game.id"
            :title="game.title"
            :thumbnail="game.thumbnail"
            :short_description="game.short_description"  
            :genre="game.genre"
            :platform="game.platform" 

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
  
    import { getGamesData } from '@/services/api/gamesAPI';
    import { getCatData} from '@/services/api/gamesCat';
  
    import GameCard from './GameCard.vue';
  
    export default {
    name : 'GamesGallery',
  
    components : {
        GameCard,
    },

    watch: {
        gridViews: function(newGridViews) {
            localStorage.setItem("gridViews", newGridViews.toString())
        },
        search: function(newSearch) {
            localStorage.setItem("search", newSearch)
        },
        gamesSortType: function(newGamesSortType){
            localStorage.setItem("gamesSortType", newGamesSortType)
        },
        gamesFilterPlat: function(newGamesFilterPlat){
            localStorage.setItem("gamesFilterPlat", newGamesFilterPlat)
        },
        gamesFilterGenre: function(newGamesFilterGenre){
            localStorage.setItem("gamesFilterGenre", newGamesFilterGenre)
        }
    },

  
    data() {
        return {
            gamesData : [],
            catData:[],
            //search:'',
            gridViews:true,
            /*gamesSortType: "default",
            gamesFilterPlat :"All",
            gamesFilterGenre :"default",*/
            search: localStorage.getItem("search") || "",
			gamesSortType: localStorage.getItem("gamesSortType") || "default",
            gamesFilterPlat: localStorage.getItem("gamesFilterPlat") || "All",
            gamesFilterGenre: localStorage.getItem("gamesFilterGenre") || "default",
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


    created: function(){
        this.retrieveGamesData()
        this. retrieveCatData()
    },
  
    methods: {
      
        async retrieveGamesData(){
            this.gamesData = await getGamesData()
            //console.log(this.gamesData)
        },

        async retrieveCatData(){
            this.catData = await getCatData()
            //console.log(this.catData)
        },
        
        cleanSearch:function(){
            this.search = '' 
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
    
    .drop-content{
        display: none;
        position: absolute;
        right:2rem;
        background-color: #070313;
        z-index: 1;
        text-align: left;
        font-size: small;
        padding: 1rem;
        border-radius: 5px;
    }

    .drop-content label{
        padding:0.5rem;
    }

    .drop-btn:hover .drop-content{
        display: flex;
        flex-direction: column;
    }

    


  </style>