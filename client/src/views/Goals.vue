<template>
    <div>
        <h1>Goals</h1>
        <div>
          <button class="btn btn-primary" v-on:click="newGoal">+ New Goal</button>
        </div>
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
    </div>
</template>

<script>
export default {
  name: 'goals',
  data() {
    return {
      goals: [
        {
          id: '1',
          num: '1',
          goal: 'Goal 1 Goal 1lsöduofrigbadsölgfdsafal 1 Goal 1 Goal 1 Goal 1 Goal 1 Goal 1 Goal 1 ',
          status: 'Achieved!'
        },
        {
          id: '2',
          num: '2',
          goal: 'Goal 2',
          status: 'Working on it!'
        },
        {
          id: '3',
          num: '3',
          goal: 'Goal 3',
          status: 'Status 3'
        },
        {
          id: '4',
          num: '4',
          goal: 'Goal 4',
          status: 'Status 4'
        }
      ]
    }
  }
}
</script>
