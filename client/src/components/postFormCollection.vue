<template>
  <div>
    <div></div>
    <form @submit="postData">
      <div class="mb-3 col-md-2">
        <label for="name">Name</label>
        <input
          id="name"
          required
          type="text"
          rows="3"
          name="name"
          v-model="posts.name"
        />
      </div>
      <div class="mb-3 col-md-2">
        <label for="desc">Description</label>
        <input
          id="desc"
          required
          type="text"
          name="desc"
          v-model="posts.desc"
        />
      </div>
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
    postData() {
      Api.post('/flashcardCollections', this.posts)
        .then((result) => {
          console.log(this.posts)
          window.location.href = '/flashcardCollections'
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
<style>
form {
  text-align: center;
}
.star {
  color: red;
}
</style>
