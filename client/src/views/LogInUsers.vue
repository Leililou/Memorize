<template>
  <div>
    <h1>Login</h1>
    <div>
      <form @submit="method" method="getUsers">
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
        <button type="submit">Sign In</button>
      </form>
    </div>
  </div>
</template>
<script>
import { Api } from '@/Api'

export default {
  name: 'Login',
  data() {
    return {
      users: {
        _id: null
      },
      gets: {
        username: null,
        password: null
      }
    }
  },
  methods: {
    method() {
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
    }
  }
}
</script>
