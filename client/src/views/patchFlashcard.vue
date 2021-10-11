<template>
  <div id="app-6" :key="(collectionId = $route.params.collection_id)">
    <div :key="(flashcardId = $route.params.flashcard_id)">
      <form @submit="patchData" method="patch">
        <input
          required
          type="text"
          name="question"
          placeholder="Question"
          v-model="patches.question"
        />
        <br />
        <br />
        <input
          required
          type="text"
          name="answer"
          placeholder="Answer"
          v-model="patches.answer"
        />
        <br>
        <br>
        <b-button v-on:click="patchData">Update Flashcard</b-button>
      </form>
    </div>
  </div>
</template>

<script>
import { Api } from '@/Api'

export default {
  name: 'Flashcard',
  mounted() {
    console.log('Page is loaded!')
    Api.get('/flashcards/' + this.flashcardId)
      .then((response) => {
        console.log(response)
        this.flashcard.question = response.data.question
        this.flashcard.answer = response.data.answer
      })
      .then(() => {
        console.log(
          'Hi. This shows after each iteration of api.get'
        )
      })
  },
  methods: {
    patchData(e) {
      Api.patch(
        '/flashcards/' + this.flashcardId,
        this.patches
      ).then((result) => {
        console.log(this.posts)
      })
      e.preventDefault()
      window.location.href = '/flashcardCollections/' + this.collectionId + '/quiz'
    }
  },
  data: function () {
    return {
      collectionId: 0,
      flashcardId: 0,
      flashcard: {
        question: '',
        answer: ''
      },
      patches: {
        question: null,
        answer: null
      }
    }
  }
}
</script>
