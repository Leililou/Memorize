<template>
  <div>
    <b-card :title="goal.name" style="max-width: 20rem" class="mb-2">
      <b-card-text>
        <div class="card-footer bg-white border-primary">
          <h6 class="description-header">Description</h6>
          <p class="description">{{ goal.description }}</p>
        </div>
        <div>
          <p>
            Status: {{ goal.status }}
            <br />
            Importance Rating: {{ goal.importanceRating }}/5
          </p>
        </div>
      </b-card-text>
      <div class="card-footer bg-white border-primary">
        <b-button :href="'/goals/edit/' + goal._id" variant="primary"
          >Edit</b-button
        >
        |
        <b-button
          variant="danger"
          v-on:click="$emit('del-goal', goal._id)"
          >X</b-button
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
</style>
