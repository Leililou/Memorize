<template>
  <div id="all">
    <h1>Flashcard Collections</h1>
    <div class="text-align-center">
      <div>
        <!-- modal2-->
        <b-button class="new-collection" variant="sucess" @click="$bvModal.show('modal-scoped')"
          >+ New collection</b-button
        >
        <b-modal id="modal-scoped">
          <template #modal-header>
            <h4 id="form-heading">New collection</h4>
          </template>

          <template #default>
            <Post-FlashCard-Collection />
          </template>
          <template #modal-footer="{ cancel }">
            <b-button size="sm" variant="danger" @click="cancel()">
              Cancel
            </b-button>
          </template>
        </b-modal>
        <!-- modal2-->
      </div>

      <user-message v-bind:message="message" v-bind:title="title"></user-message>

      <div>
        <div class="row">
          <div
            class="col-6 col-sm-3"
            v-for="flashcardCollection in flashcardCollections"
            v-bind:key="flashcardCollection._id"
          >
            <flashcardCollection-item
              v-bind:flashcardCollection="flashcardCollection"
              v-on:del-flashcardCollection="deleteFlashcardCollection"
            />
          </div>
          <!-- Force next columns to break to new line -->
          <div class="w-100"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { Api } from '@/Api'
import FlashcardCollectionItem from '../components/flashcardCollectionItem.vue'
import PostFlashcardCollection from '../components/postFormCollection.vue'
import UserMsg from '../components/userMsg.vue'

export default {
  name: 'flashcardCollections',
  components: {
    'flashcardCollection-item': FlashcardCollectionItem,
    'Post-FlashCard-Collection': PostFlashcardCollection,
    'user-message': UserMsg
  },

  mounted() {
    console.log('Page is loaded!')
    Api.get('/flashcardCollections')
      .then((response) => {
        console.log(response)
        this.flashcardCollections = response.data.FlashcardCollections
      })
      .then(() => {
        console.log(
          'Hi. This shows after each iteration of api.get(/api/flashcardCollections)'
        )
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
    deleteFlashcardCollection(_id) {
      console.log(`Deleted collection with id ${_id}`)
      Api.delete(`/flashcardCollections/${_id}`).then(() => {
        const index = this.flashcardCollections.findIndex(
          (flashcardCollection) => flashcardCollection._id === _id
        )
        this.flashcardCollections.splice(index, 1)
      })
    }
  },
  data() {
    return {
      flashcardCollections: [],
      message: 'No collection found! Please make a new collection.',
      title: "Sorry. There's nothing here..."
    }
  }
}
</script>
<style scoped>
.new-collection {
  background: rgb(20, 139, 30);
  margin-top: 10px;
  margin-bottom: 30px;
}

#all {
  margin-left: 10px;
  margin-right: 10px;
}
#form-heading {
  text-align: center;
  display: inline-block;
}
</style>
