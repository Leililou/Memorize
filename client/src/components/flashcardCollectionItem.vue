<template>
  <div class="card border-success mb-3" style="width: 18rem mx-auto">
    <!-- Add Background here for each bootstrap cards. -->
    <div class="card-body text-success">
      <h3 class="name card-title">{{ flashcardCollection.name }}</h3>
      <h6 name="description" class="desc card-text"
        ><strong>Description: </strong>{{ flashcardCollection.desc }}</h6>
      <div class="buttons">
        <a
          v-bind:href="
            '/flashcardCollection/' + flashcardCollection._id + '/quiz'
          "
          class="btn btn-outline-success mr-1"
          role="button"
          >Start the collection</a
        >
        <div>
          <div class="card-footer bg-white border-success">
            <b-button
              class="btn btn-danger mr-1"
              v-on:click="
                $emit('del-flashcardCollection', flashcardCollection._id)
              "
              >Delete</b-button
            >
            <b-button
              v-bind:href="
                '/flashcardCollection/edit/' + flashcardCollection._id
              "
              class="btn btn-primary mr-1"
              role="button"
              >Edit</b-button
            >
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

<style scoped>
h3 {
  font: bold;
  color: rgb(5, 105, 18);
}
h6 {
  color: rgba(133, 133, 133, 0.884);
}
.desc {
  font-style: oblique;
}

.btn {
  margin-top: 10px;
  margin-bottom: 10px;
  margin-right: 10px;
}

.card-footer {
  white-space: pre-wrap;
}
</style>
