<template>
  <div>
    <form>
      <input
        required
        type="text"
        name="name"
        placeholder="Name"
        v-model="posts.username"
      />
      <br />
      <br />
      <input
        required
        type="text"
        name="desc"
        placeholder="Password"
        v-model="posts.password"
      />
      <br />
      <br />
      <button v-on:click="postData" type="button">Create account</button>
      <br />
      <router-link to="/UsersLogin">Take me to sign in</router-link>
    </form>
    <user-message v-bind:message="message" v-bind:title="title"></user-message>
  </div>
</template>
<script>
import { Api } from '@/Api'
import UserMsg from '../components/userMsg.vue'

export default {
  name: 'CreateUser',
  components: {
    'user-message': UserMsg
  },
  data() {
    return {
      posts: {
        username: null,
        password: null
      },
      message: 'You have created an account. Please proceed to the login page.',
      title: 'Account created successfully!'
    }
  },
  methods: {
    showUserMessage() {
      this.$root.$emit('bv::show::modal', 'user-message-modal', '#btnShow')
    },
    postData() {
      Api.post('/users', this.posts)
        .then(() => {
          console.log(this.posts)
          this.showUserMessage()
        })
        .catch((error) => {
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
