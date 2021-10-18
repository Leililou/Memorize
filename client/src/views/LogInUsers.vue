<template>
  <div>
    <h1>Login</h1>
    <div>
      <form @submit="login">
        <input
          required
          type="text"
          name="name"
          placeholder="Name"
          v-model="gets.username"
        />
        <br />
        <br />
        <input
          type="text"
          name="desc"
          placeholder="Password"
          v-model="gets.password"
        />
        <br />
        <br />
        <button v-on:click="login" type="button">Sign In</button>
      </form>
    </div>
    <user-message v-bind:message="message" v-bind:title="title"></user-message>
  </div>
</template>
<script>
import { Api } from '@/Api'
import UserMsg from '../components/userMsg.vue'

export default {
  name: 'Login',
  components: {
    'user-message': UserMsg
  },
  data() {
    return {
      users: {
        _id: null
      },
      gets: {
        username: null,
        password: null
      },
      message: 'Username and password does not match! Please check your login information.',
      title: 'Incorrect login information'
    }
  },
  methods: {
    showErrorModal() {
      this.$root.$emit('bv::show::modal', 'user-message-modal', '#btnShow')
    },
    hideModal() {
      this.$root.$emit('bv::hide::modal', 'modal-1', '#btnShow')
    },
    login() {
      Api.get('/users/' + this.gets.username + '/' + this.gets.password)
        .then((response) => {
          console.log(response)
          this.users._id = response.data
        })
        .then(() => {
          console.log(
            'Hi. This shows after each iteration of api.get(/api/flashcardCollections)'
          )
          window.location.href = '/users/' + this.users._id
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
    }
  }
}
</script>
