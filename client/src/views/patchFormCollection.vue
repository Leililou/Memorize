<template>
  <div id="app-6"> {{ $route.params._id }}</div>
</template>

<script>
import { Api } from '@/Api'

export default {
  name: 'PatchCollection',
  el: '#app-6',
  mounted(el) {
    console.log('Page is loaded!')
    Api.get(`/flashcardCollections/${el}`)
      .then((response) => {
        console.log(response)
        this.flashcardCollections = response.data.FlashcardCollections
      })
      .then(() => {
        console.log(
          'Hi. This shows after each iteration of api.get(/api/flashcardCollections)'
        )
      })
  },
  data() {
    return {
      flashcardCollection: []
    }
  }
}
</script>
