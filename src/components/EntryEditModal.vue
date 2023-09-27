<script setup>
  import EntryForm from './forms/EntryForm.vue';

  const props = defineProps(['entry']);
  const emit = defineEmits([
    'entrySubmit'
  ]);

  function cancelModal() {
    let m = bootstrap.Modal.getInstance(document.getElementById("entryEditModal"));
    m.hide();
    document.getElementById("entryForm").classList.remove('was-validated');
  }

  function submitEntry() {
    emit('entrySubmit');
    cancelModal();
  }

  //! ADD A TABS TO CHOOSE EITHER TO LOOK UP AND ADD A BOOK BY ISBN or MANUALLY ENTER ITS DETAILS
  //? VALID GOOGLE BOOKS API CALL: https://www.googleapis.com/books/v1/volumes?q=isbn:9780393609394
  //! might have to make a separate component for the manually entered details form.
  //! since it will need to be used in the tab content as well as outside the tab content for editing where the tabs will not be visible.
  //! perhaps just hiding the tabs and isbn lookup tab with d-none and the manual entry tab with d-block using :class on isEdit will be enough.
</script>

<template>
  <div class="modal fade" id="entryEditModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="entryEditModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header bg-primary">
          <h1 class="modal-title fs-5" id="entryEditModalLabel">
            <span v-if="!props.entry.isEdit" class="text-light">
              <i class="fa-solid fa-plus"></i>&nbsp;Add Entry
            </span>
            <span v-else class="text-light">
              <i class="fa-solid fa-pen-to-square"></i>&nbsp;Edit Entry
            </span>
          </h1>
          <button @click="cancelModal" type="button" class="btn-close bg-light" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <ul class="nav nav-tabs mb-3" id="myTab" role="tablist">
            <li class="nav-item" role="presentation">
              <button class="nav-link active fw-bold" id="manual-tab" data-bs-toggle="tab" data-bs-target="#manual" type="button" role="tab" aria-controls="manual" aria-selected="true">Manual Entry</button>
            </li>
            <li v-if="!entry.isEdit" class="nav-item" role="presentation">
              <button class="nav-link fw-bold" id="lookup-tab" data-bs-toggle="tab" data-bs-target="#lookup" type="button" role="tab" aria-controls="lookup" aria-selected="false">Book Lookup</button>
            </li>
          </ul>
          <div class="tab-content" id="myTabContent">
            <div class="tab-pane fade show active" id="manual" role="tabpanel" aria-labelledby="lookup-tab">
              <EntryForm :entry="props.entry" :submit-entry="submitEntry"></EntryForm>
            </div>
            <div class="tab-pane fade" id="lookup" role="tabpanel" aria-labelledby="lookup-tab">
              Google books api search should go here. when a book is found, a button labeled "Use" when clicked will populate the entry prop
              with data from the books api. Either the current data modal should just take the layout of books api object structure or
              I will need to manually assign the books api object to the current entry object structure.
            </div>
          </div>
        </div>
        <div class="modal-footer d-flex justify-content-between">
          <button @click="cancelModal" type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
          <button type="submit" form="entryForm" class="btn btn-primary">Save</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>