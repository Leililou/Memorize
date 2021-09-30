<template>
  <div>
    <h3>Create a new collection</h3>
    <br />
    <Post-FlashCard-Collection/>
  </div>
</template>

<script>
import PostFlashcardCollection from '../components/postFormCollection.vue'

export default {
  name: 'PostFlashcardCollection',
  components: {
    'Post-FlashCard-Collection': PostFlashcardCollection
  }
}
</script>
