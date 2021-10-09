<template>
  <div class="card" style="width: 18rem mx-auto">
    <div class="card-body">
      <h5 class="name">{{ flashcardCollection.name }}</h5>
      <p class="desc">{{ flashcardCollection.desc }}</p>
      <div class="buttons">
        <a v-bind:href="'/flashcardCollections/'+ flashcardCollection._id +'/quiz'" class="start-quiz-button">Start</a> |
        <a v-bind:href="'/flashcardCollection/edit/'+ flashcardCollection._id" class="edit-button">Edit</a>
        <div>
          <b-button
            variant="danger"
            v-on:click="
              $emit('del-flashcardCollection', flashcardCollection._id)
            "
            >Delete Collection</b-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'flashcardCollection-item',
  props: ['flashcardCollection']
}
</script>
