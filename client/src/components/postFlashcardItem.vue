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
    postData(e) {
      Api.post(
        '/flashcardCollections/' + this.collectionId + '/flashcards',
        this.posts
      ).then((result) => {
        console.log(this.posts)
      })
      e.preventDefault()
      window.location.href =
        '/flashcardCollections/' + this.collectionId + '/quiz'
    }
  }
}
</script>
