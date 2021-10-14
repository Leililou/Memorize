<template>
  <div>
    <form @submit="postData">
      <input
        class="inputs"
        required
        type="text"
        name="name"
        placeholder="Name"
        v-model="posts.name"
      />
      <br />
      <br />
      <input
        class="inputs"
        required
        type="text"
        name="description"
        placeholder="Description"
        v-model="posts.description"
      />
      <br />
      <br />
      <input
        class="inputs"
        required
        type="text"
        name="status"
        placeholder="Status"
        v-model="posts.status"
      />
      <br />
      <br />
      <div>
        <b-form-select
          required
          v-model="posts.importanceRating"
          :options="options"
          class="inputs"
        >
        </b-form-select>
      </div>
      <br />
      <br />
      <b-button variant="primary" type="submit">Submit</b-button>
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
      },
      options: [
        { value: 1, text: 'Rating 1' },
        { value: 2, text: 'Rating 2' },
        { value: 3, text: 'Rating 3' },
        { value: 4, text: 'Rating 4' },
        { value: 5, text: 'Rating 5' }
      ]
    }
  },
  methods: {
    postData() {
      Api.post('/goals', this.posts)
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
<style scoped>
.inputs {
  width: 250px;
}
</style>

<!--
To do:
Change Status & Importance rating to be drop downmenu of options.
Status is supposed to have enum of two, Achieved! or Working on it!
Importance rating is supposed to be a rating between 1-5
 -->
