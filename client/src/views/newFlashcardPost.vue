<template>
  <div>
    <h3>Create a new flashcard</h3>
    <br />
    <post-flashcard-item/>
  </div>
</template>

<script>
import PostFlashcardItem from '../components/postFlashcardItem.vue'

export default {
  name: 'postFlashcardItem',
  components: {
    'post-flashcard-item': PostFlashcardItem
  }
}
</script>
