<template>
        <b-modal id="modal-update-flashCard">
          <template #modal-header>
            <h4>Edit flashcard</h4>
          </template>
          <template #default>
            <PatchFlashcard/>
          </template>
          <template #modal-footer="{ cancel }">
            <b-button size="sm" variant="danger" @click="cancel()">
              Cancel
            </b-button>
          </template>
        </b-modal>
</template>
