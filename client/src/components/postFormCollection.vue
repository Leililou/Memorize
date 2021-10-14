<template>
  <div>
    <div>
    </div>
    <form @submit="postData" method="post">
      <input
        required
        type="text"
        name="name"
        placeholder="Name"
        v-model="posts.name"
      />
      <br />
      <br />
      <input
        required
        type="text"
        name="desc"
        placeholder="Description"
        v-model="posts.desc"
      />
      <br />
      <br />
      <b-button size="sm" variant="success" type="submit">Submit</b-button>
    </form>
  </div>
</template>
<script>
import { Api } from '@/Api'

export default {
  name: 'PostFormCollection',
  data() {
    return {
      posts: {
        name: null,
        desc: null
      }
    }
  },
  methods: {
    postData(e) {
      Api.post('/flashcardCollections', this.posts).then((result) => {
        console.log(this.posts)
      })
      e.preventDefault()
      window.location.href = '/flashcardCollections'
    }
  }
}
</script>
<style>
form{
text-align: center;
}
</style>
