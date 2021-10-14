<template>
  <div :key="(collectionId = $route.params._id)">
    <h1>Flashcards</h1>
    <div>
      <!-- modal goes here -->
      <b-button class="new-goal" @click="$bvModal.show('modal-scoped')"
        >+ Flashcard</b-button
      >

      <b-modal id="modal-scoped">
        <template #modal-header>
          <h4 id="form-heading">New Flashcard</h4>
        </template>

        <template #default>
          <post-flashcard-item/>
        </template>
        <template #modal-footer="{ cancel }">
          <b-button size="sm" variant="danger" @click="cancel()">
            Cancel
          </b-button>
        </template>
      </b-modal>
      <!-- modal goes above -->
    </div>
    <h3>The cards</h3>
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
import PostFlashcardItem from '../components/postFlashcardItem.vue'

export default {
  name: 'flashcards',
  components: {
    'flashcard-item': FlashcardItem,
    'post-flashcard-item': PostFlashcardItem
  },
  mounted() {
    console.log('Page is loaded!')
    Api.get('/flashcardCollections/' + this.collectionId + '/flashcards')
      .then((response) => {
        console.log(response)
        this.flashcards = response.data.FlashcardCollection[0].flashcards
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.data)
          console.log(error.response.status)
          console.log(error.response.headers)
        } else if (error.request) {
          console.log(error.request)
        } else {
          console.log('Error', error.message)
        }
      })
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
