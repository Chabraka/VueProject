<template>

    <div class="game-card">
        <img :src="thumbnail" :alt="title">
        <h3> {{ title }} </h3>
        <!--<p> {{ short_description }} </p>-->

    </div>

</template>

<script>

export default {
    name : 'GameCard',

    props : {
        title : String,
        thumbnail : String,
        short_description : String
    }
 
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


    h3{
        margin: 0.5rem;
        font-family: Orbitron ;
    }

    img{
        width: 100%;
    }

</style>