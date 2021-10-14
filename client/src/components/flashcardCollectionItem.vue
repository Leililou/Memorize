<template>

  <div class="card border-success mb-3" style="width: 18rem mx-auto">
    <div class="card-body text-success">
      <h3 class="name card-title">{{ flashcardCollection.name }}</h3>
        <h7 class="desc card-text"><strong>Description: </strong>{{ flashcardCollection.desc }}</h7>
      <div class="buttons">
           <a v-bind:href="'/flashcardCollection/'+ flashcardCollection._id+'/quiz'" class="btn btn-outline-success mr-1" role="button">Start the collection</a>
        <div>
          <div class="card-footer bg-white border-success">
            <b-button class="btn btn-outline-danger" v-on:click="$emit('del-flashcardCollection', flashcardCollection._id)">Delete</b-button>
          <a v-bind:href="'/flashcardCollection/edit/'+ flashcardCollection._id" class="btn btn-outline-warning mr-1 " role="button">Edit</a>
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
h3{
  font: bold;
  color: rgb(5, 105, 18);
}
h7{
  color: rgba(133, 133, 133, 0.884);
}
.desc{
  font-style: oblique;
}

.btn{
  margin-top : 10px;
  margin-bottom: 10px;
  margin-right: 10px;
}

.card-footer{
  white-space: pre-wrap;
}

</style>
