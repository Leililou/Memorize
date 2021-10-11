<template>
  <div>
    <h3>Create a new goal</h3>
    <br />
    <post-goal-item/>
  </div>
</template>

<script>
import PostGoalItem from '../components/postFormGoals.vue'

export default {
  name: 'postgoalitem',
  components: {
    'post-goal-item': PostGoalItem
  }
}
</script>
