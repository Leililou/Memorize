<template>
  <div>
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
        name="description"
        placeholder="Description"
        v-model="posts.description"
      />
      <br />
      <br />
      <input
        required
        type="text"
        name="status"
        placeholder="Status"
        v-model="posts.status"
      />
      <br />
      <br />
      <input
        required
        type="text"
        name="importanceRating"
        placeholder="Importance Rating"
        v-model="posts.importanceRating"
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
  name: 'PostFormCollection',
  data() {
    return {
      posts: {
        name: null,
        description: null,
        importanceRating: null,
        status: null
      }
    }
  },
  methods: {
    postData() {
      Api.post('/goals', this.posts)
        .then((result) => {
          console.log(this.posts)
          window.location.href = '/Goals'
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

<!--
To do:
Change Status & Importance rating to be drop downmenu of options.
Status is supposed to have enum of two, Achieved! or Working on it!
Importance rating is supposed to be a rating between 1-5
 -->
