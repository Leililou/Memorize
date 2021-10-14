import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import FlashcardCollections from './views/flashcardCollections.vue'
import Goals from './views/Goals.vue'
import About from './views/About.vue'
import PostFlashcardCollection from './views/postFlashcardCollection.vue'
import EditFlashcardCollection from './views/patchFormCollection.vue'
import Quiz from './views/Quiz.vue'
import CreateFlashcard from './views/newFlashcardPost.vue'
import EditFlashcard from './views/patchFlashcard.vue'
import CreateGoal from './views/newGoal.vue'
import EditGoal from './views/patchGoals.vue'
import CreateUser from './views/CreateUser.vue'
import UsersLogin from './views/LogInUsers.vue'
import UserPage from './views/UserPage.vue'
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
      name: 'postCollection',
      component: PostFlashcardCollection
    },
    {
      path: '/flashcardCollection/Edit/:_id',
      name: 'editCollection',
      component: EditFlashcardCollection
    },
    {
      path: '/flashcardCollection/:_id/Quiz',
      name: 'quiz',
      component: Quiz
    },
    {
      path: '/flashcardsCollection/:_id/quiz/newflashcard',
      name: 'createFlashcard',
      component: CreateFlashcard
    },
    {
      path: '/flashcardCollections/:collection_id/edit/:flashcard_id',
      name: 'editFlashcard',
      component: EditFlashcard
    },
    {
      path: '/Goals/newGoal',
      name: 'newGoal',
      component: CreateGoal
    },
    {
      path: '/Goals/edit/:_id',
      name: 'editGoal',
      component: EditGoal
    },
    {
      path: '/UsersSignUp',
      name: 'createUser',
      component: CreateUser
    },
    {
      path: '/UsersLogin',
      name: 'usersLogin',
      component: UsersLogin
    },
    {
      path: '/users/:_id',
      name: 'userPage',
      component: UserPage
    }
  ]
})
