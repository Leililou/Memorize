<template>
    <div>
      <h1>Flashcards</h1>
        <div class="text-align-center">
          <button class="btn btn-primary" v-on:click="newFlashcardCollection">+ New Collections</button>
        </div>
        <div>
          <h3>Collections</h3>
          <flashcardcollection-item v-bind:flashcardCollection="flashcardCollection"></flashcardcollection-item>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
import flashcardCollectionItem from '../components/flashcardCollectionItem.vue'
import { Api } from '@/Api'

export default {
  name: 'flashcardCollections',
  component: {
    'flashcardCollection-item': flashcardCollectionItem
  },
  mounted() {
    console.log('Page is now loaded!')
  },
  methods: {
    deleteflashcardCollection(id) {
      console.log(`Delete collection with id ${id}`)
      Api.delete(`/api/flashcardCollections/${id}`)
        .then(response => {
          const index = this.flashcardCollections.findIndex(flashcardCollections => flashcardCollections.id === id)
          this.flashcardCollections.splice(index, 1)
        })
    }
  },
  data() {
    return {
      flashcardCollections: [
        {
          name: 'name 1',
          desc: 'desc 1',
          id: '1'
        }
      ]
    }
  }
}
</script>
