<template>
  <div id="app-6" :key="(collectionId = $route.params._id)">
    <div>
      <form @submit="patchData" method="patch">
        <input
          required
          type="text"
          name="name"
          placeholder="Name"
          v-model="patches.name"
        />
        <br />
        <br />
        <input
          required
          type="text"
          name="desc"
          placeholder="Description"
          v-model="patches.desc"
        />
        <br />
        <br />
        <b-button v-on:click="patchData">Update Collection</b-button>
      </form>
    </div>
  </div>
</template>

<script>
import { Api } from '@/Api'

export default {
  name: 'FlashcardCollection',
  mounted() {
    console.log('Page is loaded!')
    Api.get('/flashcardCollections/' + this.collectionId)
      .then(() => {
        console.log(
          'Hi. This shows after each iteration of api.get(/api/flashcardCollections)'
        )
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
    patchData(e) {
      Api.patch(
        '/flashcardCollections/' + this.collectionId,
        this.patches
      ).then((result) => {
        console.log(this.patches)
      })
      e.preventDefault()
      window.location.href = '/flashcardCollections'
    }
  },
  data: function () {
    return {
      collectionId: 0,
      flashcardCollection: {
        name: '',
        desc: ''
      },
      patches: {
        name: null,
        desc: null
      }
    }
  }
}
</script>
