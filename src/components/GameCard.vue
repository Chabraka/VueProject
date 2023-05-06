<template>


    <div v-show="gridView" class="game-card">
        <img :src="thumbnail" :alt="title">
        <h3> {{ title }} </h3>
    </div>

    <div v-show="!gridView" class="game-list">
        <div>
            <img :src="thumbnail" :alt="title">
            <span>
                <i class="fa-regular fa-heart fa-lg"></i>
                <i class="fa-solid fa-heart fa-lg"></i>
            </span>
        </div>
        

        <div>
            <h3> {{ title }} </h3>
            <p> {{ short_description }} </p>
            <div class="details-game">
                <p> {{ genre }} </p>
                <p> {{ platform }} </p>
            </div>
        </div>
    </div>


</template>

<script>

export default {
    name : 'GameCard',

    props : {
        title : String,
        thumbnail : String,
        short_description : String,
        genre: String,
        platform: String,
        release_date: Date,
        
        gridView: Boolean
    },

    data() {
        return {
            gamesData : [],
            search:'',
        }
    },
 
}


</script>

<style scoped>

    @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@600&display=swap');
    .game-card{    
        width:20rem;
        text-align: center;
        box-shadow: 0.1rem .2rem .4rem rgba(13, 230, 219, 0.295);
        background:#fff;
        margin:4rem 2rem;
        background-color: rgb(15, 3, 44);
        color: rgb(162, 245, 245);
        margin :1.3rem;
        transition: all 0.2s ease;
    }

    .game-card:hover{    
        scale: 1.05;
    }

    .game-card>img{
        width: 100%;
    }


    h3{
        margin: 0.5rem;
        font-family: Orbitron ;
    }

    .game-list{    
        display: flex;
        width: 31rem;
        text-align: start;
        padding: 1rem;
        margin: 1rem;
        box-shadow: 0.1rem .2rem .4rem rgba(13, 230, 219, 0.295);
        background-color: rgb(15, 3, 44);
        transition: all 0.2s ease;
    }

    .game-list:hover{    
        scale: 1.05;
    }


    .game-list>div>img{
        padding-right: 1rem;
        width:10rem;
        object-fit: contain;
        
    }

    .details-game{
        display: flex;
        justify-content: space-between;
    }

    .game-list p{    
        margin: 0.5rem;
        font-weight: 100;
        font-size: 0.8rem;
    }

   

   

</style>