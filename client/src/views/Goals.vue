<template>
  <div>
    <h1>Goals</h1>
    <div style="margin-bottom: 10px">
      <div>
        <b-button @click="showModal" ref="btnShow" variant="outline-danger"
          >Delete All Goals</b-button
        >
      </div>

      <b-modal
        id="modal-1"
        ok-title="Confirm"
        @ok="deleteAllGoals"
        @cancel="hideModal"
      >
        <div class="d-block">Please press Confirm to delete all goals.</div>
      </b-modal>
    </div>

    <user-message v-bind:message="message" v-bind:title="title"></user-message>

    <div style="margin-bottom: 15px">
      <!-- modal goes here -->
      <b-button
        class="new-goal"
        variant="success"
        @click="$bvModal.show('modal-scoped')"
        >+ New Goal</b-button
      >

      <b-modal id="modal-scoped">
        <template #modal-header>
          <h4 id="form-heading">New Goal</h4>
        </template>

        <template #default>
          <post-goal-item />
        </template>
        <template #modal-footer="{ cancel }">
          <b-button size="sm" variant="danger" @click="cancel()">
            Cancel
          </b-button>
        </template>
      </b-modal>
      <!-- modal goes above -->
    </div>
    <div class="row">
      <div class="col-6 col-sm-3" v-for="goal in goals" v-bind:key="goal._id">
        <goal-item-card v-bind:goal="goal" v-on:del-goal="deleteGoal" />
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { Api } from '@/Api'
import PostGoalItem from '../components/postFormGoals.vue'
import GoalItemCard from '../components/goalsItemCard.vue'
import UserMsg from '../components/userMsg.vue'

export default {
  name: 'goal',
  components: {
    'post-goal-item': PostGoalItem,
    'goal-item-card': GoalItemCard,
    'user-message': UserMsg
  },
  mounted() {
    console.log('Page has been loaded!')
    Api.get('/goals')
      .then((response) => {
        console.log(response)
        this.goals = response.data.Goals
      })
      .catch((error) => {
        if (error.response) {
          this.showErrorModal()
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
    showErrorModal() {
      this.$root.$emit('bv::show::modal', 'user-message-modal', '#btnShow')
    },
    showModal() {
      this.$root.$emit('bv::show::modal', 'modal-1', '#btnShow')
    },
    hideModal() {
      this.$root.$emit('bv::hide::modal', 'modal-1', '#btnShow')
    },
    deleteGoal(_id) {
      console.log(`Deleted collection with id ${_id}`)
      Api.delete(`/goals/${_id}`).then(() => {
        const index = this.goals.findIndex((goal) => goal._id === _id)
        this.goals.splice(index, 1)
        window.location.href = '/goals'
      })
    },
    deleteAllGoals() {
      console.log('Deleted all goals')
      Api.delete('/goals').then(() => window.location.reload())
    }
  },
  data() {
    return {
      goals: [],
      message: 'No goal found! Please make a new goal.',
      title: "Sorry. There's nothing here..."
    }
  }
}
</script>
