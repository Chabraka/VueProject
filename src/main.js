import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'

import GamesGallery from "./components/GamesGallery.vue"
import CardDetails from "./components/CardDetails.vue"


const routes = [
  { path: '/', component: GamesGallery },
  { path: '/game/:id', component: CardDetails },
  //{ path: '/:pathMatch(.*)*', redirect: '/' },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

const app = createApp(App)
app.use(router)
app.mount('#app')