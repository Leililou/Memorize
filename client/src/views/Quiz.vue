<template>
  <div :key="(collectionId = $route.params._id)">
    <h1>Flashcards</h1>
    <div>
      <b-button variant="primary" v-bind:href="'/flashcardsCollection/' + collectionId + '/quiz/newflashcard'" class="newFlashcard-button">+ Flashcard</b-button>
    </div>
    <h3>The cards</h3>
    /*
    *
     */

     /*5
     4
      */
    <b-container>
      <b-row>
        <b-col
          v-for="flashcard in flashcards"
          v-bind:key="flashcard._id"
          style="margin-bottom: 15px"
        >
          <flashcard-item
            v-bind:flashcard="flashcard"
            v-on:del-flashcard="deleteFlashcard"
          />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
// @ is an alias to /src
import { Api } from '@/Api'
import FlashcardItem from '../components/flashcardItem.vue'

export default {
  name: 'flashcards',
  components: {
    'flashcard-item': FlashcardItem
  },
  mounted() {
    console.log('Page is loaded!')
    Api.get('/flashcardCollections/' + this.collectionId + '/flashcards').then(
      (response) => {
        console.log(response)
        this.flashcards = response.data.FlashcardCollection[0].flashcards
      }
    )
  },
  methods: {
    deleteFlashcard(_id) {
      console.log(`Deleted flashcard with id ${_id}`)
      Api.delete(`/flashcards/${_id}`).then(() => {
        const index = this.flashcards.findIndex(
          (flashcard) => flashcard._id === _id
        )
        this.flashcards.splice(index, 1)
      })
    }
  },
  data() {
    return {
      collectionId: 0,
      flashcards: []
    }
  }
}
</script>
