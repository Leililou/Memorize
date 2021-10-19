<template>
  <div id="app-6" :key="(collectionId = $route.params._id)">
    <div>
      <form @submit="patchData">
        <input
          type="text"
          name="name"
          :placeholder="flashcardCollection.name"
          v-model="patches.name"
        />
        <br />
        <br />
        <input
          type="text"
          name="desc"
          :placeholder="flashcardCollection.desc"
          v-model="patches.desc"
        />
        <br />
        <br />
        <b-button type="submit">Update Collection</b-button>
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
      .then((response) => {
        console.log(response)
        this.flashcardCollection.name = response.data.name
        this.flashcardCollection.desc = response.data.desc
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
