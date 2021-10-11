<template>
  <div
    class="card"
    style="width: 18rem mx-auto"
    :key="(collectionId = $route.params._id)"
  >
    <div class="card-body">
      <h5 class="question">Q: {{ flashcard.question }}</h5>
      <h5 class="answer">A: {{ flashcard.answer }}</h5>
      <div class="Buttons">
        <b-button
          variant="primary"
          v-bind:href="
            '/flashcardCollections/' + collectionId + '/edit/' + flashcard._id
          "
          >Edit</b-button
        >
        |
        <b-button
          variant="danger"
          v-on:click="$emit('del-flashcard', flashcard._id)"
          >X</b-button
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'flashcard-item',
  props: ['flashcard'],
  data() {
    return {
      collectionId: 0
    }
  }
}
</script>
