import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Flashcards from './views/Flashcards.vue'
import Goals from './views/Goals.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/flashcards',
      name: 'flashcards',
      component: Flashcards
    },
    {
      path: '/goals',
      name: 'goals',
      component: Goals
    }
  ]
})
