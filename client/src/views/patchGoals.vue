<template>
  <div id="app-6" :key="(goalId = $route.params._id)">
    <div>
      <form @submit="patchData" method="patch">
        <input
        required
        type="text"
        name="name"
        placeholder="Name"
        v-model="patches.name"
      />
      <br />
      <br />
      <input
        required
        type="text"
        name="description"
        placeholder="Description"
        v-model="patches.description"
      />
      <br />
      <br />
      <input
        required
        type="text"
        name="status"
        placeholder="Status"
        v-model="patches.status"
      />
      <br />
      <br />
      <input
        required
        type="text"
        name="importanceRating"
        placeholder="Importance Rating"
        v-model="patches.importanceRating"
      />
        <br>
        <br>
        <b-button v-on:click="patchData">Update Goal</b-button>
      </form>
    </div>
  </div>
</template>

<script>
import { Api } from '@/Api'

export default {
  name: 'Goal',
  mounted() {
    console.log('Page is loaded!')
    Api.get('/goals/' + this.goalId)
      .then((response) => {
        console.log(response)
        this.goal.name = response.data.name
        this.goal.desc = response.data.description
        this.goal.desc = response.data.importanceRating
        this.goal.desc = response.data.status
      })
      .then(() => {
        console.log(
          'Hi. This shows after each iteration of api.get(/api/flashcardCollections)'
        )
      })
  },
  methods: {
    patchData(e) {
      Api.patch(
        '/goals/' + this.goalId,
        this.patches
      ).then((result) => {
        console.log(this.patches)
      })
      e.preventDefault()
      window.location.href = '/Goals'
    }
  },
  data: function () {
    return {
      goalId: 0,
      goal: {
        name: '',
        description: '',
        importanceRating: '',
        status: ''
      },
      patches: {
        name: null,
        desc: null,
        importanceRating: null,
        status: null
      }
    }
  }
}
</script>
