<template>
  <div>
    <form @submit="postData" method="post">
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
      <button type="submit">Create account</button>
      <br />
      <router-link to="/UsersLogin">Take me to sign in</router-link>
    </form>
  </div>
</template>
<script>
import { Api } from '@/Api'

export default {
  name: 'PostFormCollection',
  data() {
    return {
      posts: {
        username: null,
        password: null
      }
    }
  },
  methods: {
    postData() {
      Api.post('/users', this.posts)
        .then(() => {
          console.log(this.posts)
          window.location.reload()
        })
      // To do:
      // Insert pop up clarification and instructions for user.
    }
  }
}
</script>
