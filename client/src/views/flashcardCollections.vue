<template>
  <div>
    <h1>Flashcard Collections</h1>
    <div class="text-align-center">
      <a class="btn btn-primary" href="/flashcardsCollection/post" role="button">+ New Collection</a>
    </div>
    <div>
      <h3>Collections</h3>
      <b-container>
        <b-row>
          <b-col
            v-for="flashcardCollection in flashcardCollections"
            v-bind:key="flashcardCollection._id"
            style="margin-bottom: 15px"
          >
            <flashcardCollection-item
              v-bind:flashcardCollection="flashcardCollection"
              v-on:del-flashcardCollection="deleteFlashcardCollection"
            />
          </b-col>
        </b-row>
      </b-container>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { Api } from '@/Api'
import FlashcardCollectionItem from '../components/flashcardCollectionItem.vue'

export default {
  name: 'flashcardCollections',
  components: {
    'flashcardCollection-item': FlashcardCollectionItem
  },
  mounted() {
    console.log('Page is loaded!')
    Api.get('/flashcardCollections')
      .then((response) => {
        console.log(response)
        this.flashcardCollections = response.data.FlashcardCollections
      })
      .then(() => {
        console.log(
          'Hi. This shows after each iteration of api.get(/api/flashcardCollections)'
        )
      })
  },
  methods: {
    deleteFlashcardCollection(_id) {
      console.log(`Deleted collection with id ${_id}`)
      Api.delete(`/flashcardCollections/${_id}`).then((response) => {
        const index = this.flashcardCollections.findIndex(
          (flashcardCollection) => flashcardCollection._id === _id
        )
        this.flashcardCollections.splice(index, 1)
      })
    }
  },
  data() {
    return {
      flashcardCollections: []
    }
  }
}
</script>
