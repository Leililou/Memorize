<template>
      <div id="error-message">
      <b-modal id="error-modal">
        <template #modal-header>
          <h4 id="form-heading">Sorry</h4>
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
  name: 'error-message',
  props: ['message']
// No goals found! Please make a new goal
}
</script>
