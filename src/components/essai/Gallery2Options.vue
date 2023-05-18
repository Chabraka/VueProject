<template>

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

</template>

<script>

import { getCatData} from '@/services/api/gamesCat';

export default {
name: 'Gallery2Options',

    props: {
        gamesSortType: String,
        gamesFilterPlat: String,
        gamesFilterGenre: String,
},

emits: ["update:gamesSortType", "update:gamesFilterPlat", "update:gamesFilterGenre"],

    watch: {

        gamesSortType: function(newGamesSortType){
            localStorage.setItem("gamesSortType", newGamesSortType)
        },

        gamesFilterPlat: function(newGamesFilterPlat){
            localStorage.setItem("gamesFilterPlat", newGamesFilterPlat)
        },

        gamesFilterGenre: function(newGamesFilterGenre){
            localStorage.setItem("gamesFilterGenre", newGamesFilterGenre)
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

        onGamesSortTypeChanged(event) {
            this.$emit('update:gamesSortType', event.target.value) 
        },

        onGamesFilterPlatChanged(event) {
            this.$emit('update:gamesFilterPlat', event.target.value) 
        },

        onGamesFilterGenreChanged(event) {
            this.$emit('update:gamesFilterGenre', event.target.value) 
        },

     }
     
 }
 
 
 
 </script>
 
 <style>
     
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