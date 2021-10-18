<template>
      <div id="user-message">
      <b-modal id="user-message-modal">
        <template #modal-header>
          <h4 id="form-heading">{{title}}</h4>
        </template>

        <template #default>
         <p> {{message}} </p>
        </template>
        <template #modal-footer="{ cancel }">
          <b-button size="sm" variant="primary" @click="cancel()">
            Confirm
          </b-button>
        </template>
        </b-modal>
    </div>
</template>
<script>
export default {
  name: 'user-message',
  props: ['message', 'title']
// No goals found! Please make a new goal
}
</script>
