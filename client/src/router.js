import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import FlashcardCollections from './views/flashcardCollections.vue'
import Goals from './views/Goals.vue'
import About from './views/About.vue'
import PostFlashcardCollection from './views/postFlashcardCollection.vue'
import PatchFlashcardCollection from './views/patchFormCollection.vue'
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
      path: '/flashcardCollections',
      name: 'flashcardCollections',
      component: FlashcardCollections
    },
    {
      path: '/goals',
      name: 'goals',
      component: Goals
    },
    {
      path: '/About',
      name: 'about',
      component: About
    },
    {
      path: '/flashcardsCollection/post',
      name: 'post',
      component: PostFlashcardCollection
    },
    {
      path: '/flashcardCollection/patch/:_id',
      name: 'patch',
      component: PatchFlashcardCollection
    }
  ]
})
