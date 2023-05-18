<template>

    <div class="menu-options">

            <SearchBar/>
     
        <ul class="display">

            <CardOptions/>
            <Gallery2Options/>

        </ul>    
 
     </div>
 
 </template>
 
 <script>
 
 import SearchBar from './SearchBar.vue'
 import Gallery2Options from './Gallery2Options.vue';
 import CardOptions from './CardOptions.vue'
 
 export default {
   name: 'MenuOptions',

   
   components : {
        SearchBar,
        Gallery2Options,
        CardOptions
    },

  
}
 
 
 
 </script>
 
 <style>

    .menu-options{
         display: flex;
         flex-wrap: wrap;
         justify-content: space-around;
         align-items: center;
         background-color: rgb(1, 1, 10);
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