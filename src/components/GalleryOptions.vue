<template>
   <div class="gallery-options">

        <div class="search-bar">
            <i class="fa-solid fa-magnifying-glass"></i>
            <input type="text" :value="search" @input="onSearchChanged" placeholder="Rechercher un jeu...">
            <span v-if="search" @click="cleanSearch">X</span>
            <i v-if="search && gamesFilteredGenreData.length >= 1 ">
            {{gamesFilteredGenreData.length}} résultat<i v-if="gamesFilteredGenreData.length >= 2">s</i>
            </i>
        </div>

        
        <ul class="display">

            <li @click="onGridViewChanged(true)">
                <i  class="fa-solid fa-grip fa-xl"></i>
            </li>
            
            <li>
                <i @click="onGridViewChanged(false)" class="fa-solid fa-list fa-xl"></i>
            </li>

            <li>
                <i :class="{ 'heartactive': gamesSortFavorites, 'favorites': favorites.length > 1 }" @click="toggleSortFavorites()" class="fa-solid fa-heart fa-lg"></i>

      
            </li>

            <li class="drop-btn">
                <i @click="Filters = true" class="fa-solid fa-filter fa-lg"></i>

                <div class="drop-content">
                    <label for="game-sort">Trier par : </label>
                    <select :value="gamesSortType" @input="onGamesSortTypeChanged" id="game-sort">
                        <option value="default"> Par défaut</option>
                        <option value="AZName"> Noms de A à Z</option>
                        <option value="ZAName"> Noms de Z à A</option>
                        <option value="RecenttoOld"> Du plus récent au plus vieux</option>
                        <option value="OldtoRecent"> Du plus vieux au plus récent</option>
                    </select>

                    <label for="game-filter-plat">Sélectionner par plateforme  : </label>
                    <select :value="gamesFilterPlat" @input="onGamesFilterPlatChanged" id="game-filter-plat">
                        <option value="All"> All</option>
                        <option value="PC (Windows)">PC (Windows)</option>
                        <option value="Web Browser"> Web Browser</option>
                    </select>

                    <label for="game-filter-genre">Sélectionner par genre: </label>
                    <select :value="gamesFilterGenre" @input="onGamesFilterGenreChanged" id="game-filter-genre">
                        <option value="default"> Par défaut</option>
                        <option v-for="cat in catData" :key="cat" :value="cat">{{cat}}</option>
                    </select>
                </div>
                
            </li>
        </ul>    

    </div>

</template>

<script>

import { getCatData} from '@/services/api/gamesCat';

export default {
  name: 'GalleryOptions',

	props: {
		search: String,
		gamesSortType: String,
        gamesFilterPlat: String,
        gamesFilterGenre: String,
        gamesFilteredGenreData: {
            type: Array,
            required: true
        },
        gridView: Boolean,
        gamesSortFavorites: Boolean,
        favorites: {
            type: Array,
            required: true
        },

  },

  emits: ["update:search", "update:gamesSortType", "update:gamesFilterPlat", "update:gamesFilterGenre", "update:gridView", "toggleSortFavorites"],

	watch: {

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
        },

        gridView: function(newGridView){
            localStorage.setItem("gridView", newGridView)
        },

        gamesSortFavorites: function(newGamesSortFavorites){
            localStorage.setItem("gamesSortFavorites", newGamesSortFavorites)
        },


	},

    data(){

        return {
            catData:[],
        }
    },

    created: function(){
        this.retrieveCatData();
    },

	methods: {

        async retrieveCatData(){
            this.catData = await getCatData()
        },

		onSearchChanged(event) {
			this.$emit('update:search', event.target.value) 
		},

        cleanSearch: function() {
			this.$emit('update:search', "")
		},

		onGamesSortTypeChanged(event) {
			this.$emit('update:gamesSortType', event.target.value) 
		},

        onGamesFilterPlatChanged(event) {
			this.$emit('update:gamesFilterPlat', event.target.value) 
		},

        onGamesFilterGenreChanged(event) {
			this.$emit('update:gamesFilterGenre', event.target.value) 
		},

        onGridViewChanged(value) {
            this.$emit('update:gridView', value) 
        },

        toggleSortFavorites() {
            this.$emit("toggleSortFavorites");
        },
  

	}
    
}



</script>

<style scoped>
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

    .heartactive{
        color : yellow;
    }

    .favorites{
    
       position: relative;
    }

    .favorites::after {
        content: "";
        position: absolute;
        top: -5px; /* Ajustez la position verticale du point selon vos besoins */
        right: -5px; /* Ajustez la position horizontale du point selon vos besoins */
        width: 10px; /* Ajustez la taille du point selon vos besoins */
        height: 10px; /* Ajustez la taille du point selon vos besoins */
        background-color: red; /* Couleur du point */
        border-radius: 50%; /* Rend le point circulaire */
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