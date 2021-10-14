<template>
  <div :key="(userId = $route.params._id)">
    <h1>User Profile</h1>
    <br />
    <h2>{{ user.username }}</h2>
    <div name="buttons-div">
      <p>Press this button to delete your user. <br /></p>
      <b-button @click="showModal" ref="btnShow" variant="danger">X</b-button>
      <!--b-button v-on:click="deleteUser" variant="danger">X</b-button-->
      <b-modal
        id="modal-1"
        ok-title="Confirm"
        @ok="deleteUser"
        @cancel="hideModal"
      >
        <div class="d-block">Please press Confirm to delete user.</div>
      </b-modal>
      <br />
      <br />
      <br />
      <div>
        <h3>Edit login Information</h3>
        <form @submit="editUser" method="patch">
          <input
            type="text"
            name="username"
            :placeholder="user.username"
            v-model="patchesUser.username"
          />
          <br />
          <br />
          <input
            type="text"
            name="password"
            placeholder="password"
            v-model="patchesUser.password"
          />
          <br />
          <br />
          <b-button v-on:click="editUser">Save Information</b-button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { Api } from '@/Api'
export default {
  name: 'UserPage',
  data() {
    return {
      modalShow: false,
      userId: null,
      user: {},
      patchesUser: {
        username: null,
        password: null
      }
    }
  },
  mounted() {
    console.log('Page is loaded!')
    Api.get('/users/' + this.userId)
      .then((response) => {
        console.log(response)
        this.user = response.data
      })
      .then(() => {
        console.log('Hi. This shows after each iteration.')
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
    showModal() {
      this.$root.$emit('bv::show::modal', 'modal-1', '#btnShow')
    },
    hideModal() {
      this.$root.$emit('bv::hide::modal', 'modal-1', '#btnShow')
    },
    deleteUser() {
      console.log(`Deleted user id with ${this.userId}`)
      Api.delete(`/users/${this.userId}`)
      window.location.href = '/UsersSignUp'
    },
    editUser() {
      console.log('Edited user.')
      Api.patch('/users/' + this.userId, this.patchesUser).then(() => {
        console.log(this.patchesUser)
      })
      window.location.reload()
    }
  }
}
</script>
