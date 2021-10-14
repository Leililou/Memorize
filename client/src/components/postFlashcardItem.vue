<template>
  <div :key="(collectionId = $route.params._id)">
    <form @submit="postData" method="post">
      <input
        required
        type="text"
        question="question"
        placeholder="Question"
        v-model="posts.question"
      />
      <br />
      <br />
      <input
        required
        type="text"
        question="answer"
        placeholder="Answer"
        v-model="posts.answer"
      />
      <br />
      <br />
      <button type="submit">Submit</button>
    </form>
  </div>
</template>
<script>
import { Api } from '@/Api'

export default {
  name: 'PostFlashcardItem',
  data() {
    return {
      collectionId: 0,
      posts: {
        question: null,
        answer: null
      }
    }
  },
  methods: {
    postData() {
      Api.post(
        '/flashcardCollections/' + this.collectionId + '/flashcards',
        this.posts
      )
        .then((result) => {
          console.log(this.posts)
          window.location.reload()
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
    }
  }
}
</script>
