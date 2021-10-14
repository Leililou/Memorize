<template>
  <div id="app-6" :key="(goalId = $route.params._id)">
    <div>
      <form @submit="patchData" method="patch">
        <input
        required
        type="text"
        name="name"
        :placeholder="goal.name"
        v-model="patches.name"
      />
      <br />
      <br />
      <input
        required
        type="text"
        name="description"
        :placeholder="goal.description"
        v-model="patches.description"
      />
      <br />
      <br />
      <input
        required
        type="text"
        name="status"
        :placeholder="goal.status"
        v-model="patches.status"
      />
      <br />
      <br />
      <input
        required
        type="text"
        name="importanceRating"
        :placeholder="goal.importanceRating"
        v-model="patches.importanceRating"
      />
        <br>
        <br>
        <b-button v-on:click="checkInputFields">Update Goal</b-button>
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
        this.goal.description = response.data.description
        this.goal.importanceRating = response.data.importanceRating
        this.goal.status = response.data.status
      })
      .then(() => {
        console.log(
          'Hi. This shows after each iteration of api.get(/api/flashcardCollections)'
        )
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.data)
          console.log(error.response.status)
          console.log(error.response.headers)
        } else if (error.request) {
          console.log(error.request)
        } else {
          console.log('Error', error.message)
        }
      })
  },
  methods: {
    putData() {
      Api.put('/goals/' + this.goalId, this.patches).then((result) => {
        console.log(this.patches)
        window.location.href = '/Goals'
      })
    },
    patchData() {
      Api.patch('/goals/' + this.goalId, this.patches).then((result) => {
        console.log(this.patches)
        window.location.href = '/Goals'
      })
    },
    checkInputFields() {
      if (
        this.patches.name === null ||
        this.patches.description === null ||
        this.patches.importanceRating === null ||
        this.patches.status === null
      ) {
        return this.patchData()
      } else {
        return this.putData()
      }
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
