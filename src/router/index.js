import { createRouter, createWebHistory } from 'vue-router'

import Home from '../pages/Home.vue'
import Album from '../pages/Album.vue'
import Favoris from '../pages/favoris.vue'


const routes = [
  {
    path:'/',
    component:Home
  },

  {
    path:'/album/:id',
    component:Album
  },

  {
    path:'/favoris',
    component:Favoris
  }
]

export default createRouter({
  history:createWebHistory(),
  routes
})