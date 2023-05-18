<template>
   
    <li @click="onGridViewChanged(true)">
        <i  class="fa-solid fa-grip fa-xl"></i>
    </li>
    
    <li>
        <i @click="onGridViewChanged(false)" class="fa-solid fa-list fa-xl"></i>
    </li>

    <li>
        <i @click="Favorites = true" class="fa-solid fa-heart fa-lg"></i>
    </li>

</template>
 
<script>

export default {
name: 'GalleryOptions',

    props: {
        gridView: Boolean
},

emits: ["update:gridView"],

    watch: {

        gridView: function(newGridView){
            localStorage.setItem("gridView", newGridView)
        },

    },

    methods: {

        onGridViewChanged(value) {
            console.log('gridView changed:', value);
            this.$emit('update:gridView', value) 
        }, 
    }
}



</script>

<style>

</style>