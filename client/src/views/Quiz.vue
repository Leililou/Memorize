<template>
  <div>
    <h3>Title: Quiz</h3>
    <flashcard-item />
  </div>
</template>

<script>
// @ is an alias to /src
import FlashcardItem from '../components/flashcardItem.vue'

export default {
  name: 'flashcards',
  components: {
    'flashcard-item': FlashcardItem
  }
}
</script>
