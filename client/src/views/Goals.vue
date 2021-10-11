<template>
  <div>
    <h1>Goals</h1>
    <div>
      <a class="btn btn-primary" href="/Goals/newGoal" role="button">+ New Goal</a>
    </div>
    <div>
      <div class="container-sm">
        <table class="table" style="margin-top: 15px">
          <thead>
            <tr>
              <th scope="col" style="width: 75px">Importance<br />1 - 5</th>
              <th scope="col" style="width: 250px">Title</th>
              <th scope="col">Goal</th>
              <th scope="col" style="width: 180px">Status</th>
            </tr>
          </thead>
          <tbody v-for="goal in goals" v-bind:key="goal._id">
            <tr v-bind:goal="goal">
              <th scope="row">{{ goal.importanceRating }}</th>
              <td>{{ goal.name }}</td>
              <td>{{ goal.description }}</td>
              <td>{{ goal.status }}</td>
              <div class="Buttons">
                <b-button
                  variant="primary"
                  v-bind:href="'/goals/edit/' + goal._id"
                  >Edit</b-button
                >
                |
                <b-button variant="danger" v-on:click="deleteGoal(goal._id)"
                  >X</b-button
                >
              </div>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { Api } from '@/Api'

export default {
  name: 'goals',
  mounted() {
    console.log('Page has been loaded!')
    Api.get('/goals').then((response) => {
      console.log(response)
      this.goals = response.data.Goals
    })
  },
  methods: {
    deleteGoal(_id) {
      console.log(`Deleted collection with id ${_id}`)
      Api.delete(`/goals/${_id}`).then(() => {
        const index = this.goals.findIndex((goal) => goal._id === _id)
        this.goals.splice(index, 1)
      })
    }
  },
  data() {
    return {
      goals: []
    }
  }
}
</script>
