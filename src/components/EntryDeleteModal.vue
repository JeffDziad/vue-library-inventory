<script setup>
const props = defineProps(['title', 'isbn', 'deleteSelf']);

function proceedWithDelete() {
  props.deleteSelf(props.isbn);
}
</script>

<template>
  <!-- Delete Modal -->
  <div class="modal fade" id="entryDeleteModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="entryDeleteModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header bg-primary">
          <h1 class="modal-title fs-5 text-light" id="entryDeleteModalLabel">Delete Entry</h1>
          <button type="button" class="btn-close bg-light" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <p class="h5">Are you sure you want to delete "{{props.title}}"?</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
          <button @click="proceedWithDelete" type="button" class="btn btn-danger text-light" data-bs-dismiss="modal">Proceed</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>