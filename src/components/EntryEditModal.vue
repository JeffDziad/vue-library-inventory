<script setup>
  import {ref} from 'vue';

  const emit = defineEmits([
    'entrySubmit'
  ]);
  const form = ref(null);
  let entryObj = ref({
    imgUrl: "",
    title: "",
    author: "",
    isbn: "",
    publisher: "",
    publishDate: "",
    status: "On Shelve",
    shelveLocation: "",
    description: "",
  });
  let temp = {};

  function populateFields(fields) {
    entryObj.value = fields;
    // this makes the edit modal inputs binded to the data. find a way to only copy the data and overwrite after validation.
  }

  function cancelModal() {
    if(entryObj.value.isEdit) {
      // isEdit can be used here to re apply the original data. Just an idea...
      // isEdit is added in App.vue to change styles in this component. it should be removed before overwriting data.
    }
    document.getElementById("entryForm").classList.remove('was-validated');
    form.value.reset();
    entryObj.value = {
      imgUrl: "",
      title: "",
      author: "",
      isbn: "",
      publisher: "",
      publishDate: "",
      status: "On Shelve",
      shelveLocation: "",
      description: "",
    };
  }

  function submitEntry() {
    if(!form.value.checkValidity()) {
      // invalid
      document.getElementById("entryForm").classList.add('was-validated');
    } else {
      // valid

      // 1. Hide Modal
      let m = bootstrap.Modal.getInstance(document.getElementById("entryEditModal"));
      m.hide();

      // 2. Save Changes
      emit('entrySubmit', entryObj.value);

      cancelModal();
    }
  }

  defineExpose({
    populateFields
  });
</script>

<template>
  <!-- Add Entry Modal -->
  <div class="modal fade" id="entryEditModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="entryEditModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="entryEditModalLabel">
            <span v-if="!entryObj.isEdit">
              <i class="fa-solid fa-plus"></i>&nbsp;Add Entry
            </span>
            <span v-else>
              <i class="fa-solid fa-pen-to-square"></i>&nbsp;Edit Entry
            </span>
          </h1>
          <button @click="cancelModal" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form ref="form" id="entryForm" class="" @submit.prevent="submitEntry" novalidate>
            <div class="input-group mb-3">
              <label class="input-group-text fw-bolder" for="newEntryImage">Image URL</label>
              <input v-model="entryObj.imgUrl" type="text" class="form-control" id="newEntryImage">
            </div>
            <div class="input-group has-validation mb-3">
              <span class="input-group-text fw-bolder" id="newEntryTitle">Title</span>
              <input v-model="entryObj.title" type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" required>
              <div class="invalid-feedback">
                Required
              </div>
            </div>
            <div class="input-group mb-3">
              <span class="input-group-text fw-bolder" id="newEntryAuthor">Author</span>
              <input v-model="entryObj.author" type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
            </div>
            <div class="input-group has-validation mb-3">
              <span class="input-group-text fw-bolder" id="newEntryISBN">ISBN</span>
              <input v-model="entryObj.isbn" type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" required>
              <div class="invalid-feedback">
                Required
              </div>
            </div>
            <div class="input-group mb-3">
              <span class="input-group-text fw-bolder" id="newEntryPublisher">Publisher</span>
              <input v-model="entryObj.publisher" type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
            </div>
            <div class="input-group mb-3">
              <span class="input-group-text fw-bolder" id="newEntryPublishDateLabel">Publish Date</span>
              <input v-model="entryObj.publishDate" id="newEntryPublishDate" class="form-control" type="date" />
            </div>
            <div class="input-group mb-3">
              <span class="input-group-text fw-bolder" id="newEntryStatus">Status</span>
              <select v-model="entryObj.status" class="form-select" aria-label="Default select example">
                <option value="On Shelve">On Shelve</option>
                <option value="Checked Out">Checked Out</option>
                <option value="Discontinued">Discontinued</option>
              </select>
            </div>
            <div class="input-group mb-3">
              <span class="input-group-text fw-bolder" id="newEntryLocation">Shelve Location</span>
              <input v-model="entryObj.shelveLocation" type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
            </div>
            <div class="form-floating">
              <textarea v-model="entryObj.description" class="form-control" placeholder="Leave a comment here" id="newEntryDescription"></textarea>
              <label class="fw-bolder" for="newEntryDescription">Description/Summary</label>
            </div>
          </form>
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