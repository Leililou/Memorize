<template>
  <div class="form-align">
    <form @submit="postData">
      <div class="mb-3 col-md-2">
        <label for="name">Name</label>
        <input
          id="name"
          class="inputs"
          required
          type="text"
          name="name"
          placeholder="Name"
          v-model="posts.name"
        />
      </div>

      <div class="mb-3 col-md-3">
        <label for="description">Description</label>
        <textarea
          class="form-control inputs"
          rows="3"
          id="description"
          required
          type="text"
          name="description"
          placeholder="Description..."
          v-model="posts.description"
        >
        </textarea>
      </div>

      <div class="mb-3 col-md-2">
        <label for="status">Status</label>
        <b-form-select
          id="status"
          class="inputs"
          required
          type="text"
          name="status"
          placeholder="Status"
          :options="status_options"
          v-model="posts.status"
        />
      </div>

      <div class="mb-3 col-md-2">
        <label for="rating">Importance</label>
        <b-form-select
          id="rating"
          required
          placeholder="Rating"
          v-model="posts.importanceRating"
          :options="rating_options"
          class="inputs"
        >
        </b-form-select>
      </div>
      <b-button variant="success" type="submit">Submit</b-button>
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
      rating_options: [
        { value: 1, text: 'Rating 1' },
        { value: 2, text: 'Rating 2' },
        { value: 3, text: 'Rating 3' },
        { value: 4, text: 'Rating 4' },
        { value: 5, text: 'Rating 5' }
      ],
      status_options: [
        { value: 'Not yet started', text: 'Not yet started' },
        { value: 'Working on it!', text: 'Working on it!' },
        { value: 'Achieved!', text: 'Achieved!' }
      ]
    }
  },
  methods: {
    postData() {
      Api.post('/goals', this.posts)
        .then((result) => {
          console.log(this.posts)
          window.location.href = '/goals'
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

.form-align {
  display: inline-block;
  text-align: left;
}

.star {
  color: red;
}
</style>

<!--
To do:
Change Status & Importance rating to be drop downmenu of options.
Status is supposed to have enum of two, Achieved! or Working on it!
Importance rating is supposed to be a rating between 1-5
 -->
