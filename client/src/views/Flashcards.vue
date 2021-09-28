<template>
    <div>
      <h1>Flashcards</h1>
        <div class="text-align-center">
          <button class="btn btn-primary" v-on:click="newFlashcardCollection">+ New Collections</button>
        </div>
        <div>
          <h3>Collections</h3>
          <div class="container-sm" style="margin-bottom: 10px" v-for="flashcardCollection in flashcardCollections" v-bind:key="flashcardCollection.id">
            <div class="title">
              <div class="card text-center">
                <div class="card-body">
                  <h5 class="name"> {{ flashcardCollection.name }}</h5>
                  <p class="desc"> {{ flashcardCollection.desc }} </p>
                  <div class="buttons">
                  <a href="#" class="start-quiz-button">Start</a> |
                  <a href="#" class="edit-button">Edit</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
import { Api } from '@/Api'

export default {
  name: 'flashcards',
  data() {
    return {
      flashcardCollections: [
        {
          id: '1',
          name: '1st name',
          desc: '1st description'
        },
        {
          id: '2',
          name: '2nd name',
          desc: '2nd description'
        },
        {
          id: '3',
          name: '3rd name',
          desc: '3rd description'
        },
        {
          id: '4',
          name: '4th name',
          desc: '4th description'
        }
      ]
    }
  },
  methods: {
    newFlashCollection() {
      Api.post('/api/flashcardCollections')
        .then(response => {
          this.flashcardCollections = response.data.flashcardCollections
        })
        .catch(error => {
          this.flashcardCollections = error
        })
    }
  }
}
</script>
