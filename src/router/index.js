import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Album from '../pages/Album.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/album/:id', component: Album }
]

export default createRouter({
  history: createWebHistory(),
  routes
})