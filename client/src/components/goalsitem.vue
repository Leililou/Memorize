<template>
  <div class="container-sm">
    <table class="table" style="margin-top: 15px">
      <thead>
        <tr>
          <th scope="col" style="width: 75px">#</th>
          <th scope="col">Goal</th>
          <th scope="col" style="width: 180px">Status</th>
        </tr>
      </thead>
      <tbody v-for="goal in goals" v-bind:key="goal.id">
        <tr>
          <th scope="row">{{ goal.num }}</th>
          <td>{{ goal.goal }}</td>
          <td>{{ goal.status }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'goal-item',
  props: ['goal']
}
</script>