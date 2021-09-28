<template>
  <div>
    <h3>Collections</h3>
      <div class="container-sm" style="margin-bottom: 10px" v-for="flashcardCollection in flashcardCollections" v-bind:key="flashcardCollection.id">
        <div class="title">
          <div class="card text-center">
            <div class="card-body">
              <h5 class="name"> {{ flashcardCollection.name }}</h5>
              <p class="desc"> {{ flashcardCollection.desc }} </p>
              <div class="buttons">
              <a href="#" class="start-quiz-button">Start</a> |
              <a href="#" class="edit-button">Edit</a> |
              <b-button variant="danger" v-on:click="$emit('del-flashcardCollection', flashcardCollection.id)">Delete Collection</b-button>
              </div>
            </div>
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
