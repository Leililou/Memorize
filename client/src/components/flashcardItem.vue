<template>
  <div
    class="card"
    style="width: 18rem mx-auto"
    :key="(collectionId = $route.params._id)"
  >
    <div class="card-body">
      <h5 class="question">{{ flashcard.question }}</h5>
      <p v-show="isDisplay" class="answer">{{ flashcard.answer }}</p>
      <div class="buttons">
        <a
          v-on:click="isDisplay = !isDisplay"
          class="btn btn-outline-success mr-1"
          role="button"
          >Toggle Answer</a
        >
        <div>
          <div class="card-footer bg-white border-success">
            <b-button
              variant="primary"
              v-bind:href="
                '/flashcardCollections/' +
                collectionId +
                '/edit/' +
                flashcard._id
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
    </div>
  </div>
</template>

<script>
export default {
  name: 'flashcard-item',
  props: ['flashcard'],
  data() {
    return {
      isDisplay: false,
      collectionId: 0
    }
  }
}
</script>

<style scoped>
.card-footer {
  margin-top: 10px;
}
</style>
