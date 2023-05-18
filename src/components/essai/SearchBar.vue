<template>

    <div class="search-bar">
        <i class="fa-solid fa-magnifying-glass"></i>
        <input type="text" :value="search" @input="onSearchChanged" placeholder="Rechercher un jeu...">
        <span v-if="search" @click="cleanSearch">X</span>
        <!-- a enlever et afficher dans gallery directement-->
        <i v-if="search && gamesFilteredGenreData.length >= 1 ">
        {{gamesFilteredGenreData.length}} résultat<i v-if="gamesFilteredGenreData.length >= 2">s</i>
        </i>
    </div>
 
 </template>
 
 <script>
 
 export default {
   name: 'SearchBar',
 
     props: {
         search: String,
         // a enlever et afficher dans gallery directement
         gamesFilteredGenreData: {
            type: Array,
            required: true
        },
   },
 
   emits: ["update:search"],
 
     watch: {
 
         search: function(newSearch) {
             localStorage.setItem("search", newSearch)
         },
     },
 
     methods: {
 
         onSearchChanged(event) {
             this.$emit('update:search', event.target.value) 
         },
 
         cleanSearch: function() {
             this.$emit('update:search', "")
         },
         
     }
     
 }
 
 
 
 </script>
 
 <style scoped>
 
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
 
</style>