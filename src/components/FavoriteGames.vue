<template>
  <button @click="showFavorites">Afficher les favoris</button>

  <div class="games-gallery">
    <GameCard
      v-for="game in gamesfavor"
      :key="game.id"
      :id="game.id"
      :title="game.title"
      :thumbnail="game.thumbnail"
      :short_description="game.short_description"
      :genre="game.genre"
      :platform="game.platform"
      :isLiked="favorites.includes(game.id)"
      @toggleLike="toggleLike(game.id)"
    />
  </div>

  <div v-if="favorites.length === 0">
    <h2>Oups</h2>
    <p>Vous n'avez pas de favoris</p>
  </div>
</template>

<script>
import { getCookie, setCookie } from '@/services/cookies/cookieUtils';

import GameCard from './GameCard.vue';

export default {
  name: 'FavoritesGames',

  components: {
    GameCard,
  },

  data() {
        return {
            favorites : [],

        }
    },

  created() {

    const isLikedCookie = getCookie(`isLiked_${this.id}`);
        if (isLikedCookie) {
            this.isLiked = isLikedCookie === 'true';
        }
  },

  methods: {
    toggleLike(gameId) {
      const game = this.games.find(game => game.id === gameId);
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
        setCookie('favorites', JSON.stringify(this.favorites), 30);
        setCookie(`isLiked_${game.id}`, game.isLiked.toString(), 30);
        console.log(document.cookie);

        this.$emit('update:toggleLike', gameId);
    }

    },

    showFavorites() {
      console.log(this.favorites);
    },
  },
};
</script>

<style scoped>
.games-gallery {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
</style>