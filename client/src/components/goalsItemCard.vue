<template>

  <div>
    <b-card :title="goal.name" class="mb-2 gold">
      <b-card-text>
        <div class="card-footer border-success">
             <p name="description" class=" desc card-text"
        ><strong>Description: </strong>{{ goal.description }}</p>
        <p class="card-text"><strong>Status: </strong><strong class="exp">{{ goal.status }}</strong></p>
        <p class="card-text"><strong>Importance Rating: </strong>
        <strong class="exp">{{ goal.importanceRating }} of 5</strong></p>
        </div>
      </b-card-text>
      <div class="card-footer bg-white border-success">
        <b-button
              class="btn btn-danger mr-1"
              v-on:click="
                $emit('del-goal', goal._id)
              "
              >Delete</b-button
            >
            <b-button
              v-bind:href="
              '/goals/edit/' + goal._id"
              class="btn btn-primary mr-1"
              variant="warning"
              role="button"
              >Edit</b-button
            >

      </div>
    </b-card>
  </div>
</template>

<script>
export default {
  name: 'goal-item-card',
  props: ['goal']
}
</script>

<style scoped>

.description {
  text-transform: capitalize;
}
.mb-2 {
  text-transform: capitalize;
}
.description-header {
  text-decoration: underline;
}
.header{
  text-decoration-color: gold;
}
.card-text {
  text-align: left;
  color: rgba(133, 133, 133, 0.884);
}

</style>
