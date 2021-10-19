<template>
  <div id="app-6" :key="(collectionId = $route.params.collection_id)">
    <div :key="(flashcardId = $route.params.flashcard_id)">
      <form @submit="patchData">
        <input
          type="text"
          name="question"
          :placeholder="flashcard.question"
          v-model="patches.question"
        />
        <br />
        <br />
        <input
          type="text"
          name="answer"
          :placeholder="flashcard.answer"
          v-model="patches.answer"
        />
        <br />
        <br />
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
        this.flashcard.answer = response.data.answer
        this.flashcard.question = response.data.question
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
    patchData() {
      Api.patch('/flashcards/' + this.flashcardId, this.patches).then(
        (result) => {
          console.log(this.posts)
          window.location.href =
            '/flashcardCollection/' + this.collectionId + '/quiz'
        }
      )
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
