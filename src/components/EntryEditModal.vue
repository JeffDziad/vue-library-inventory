<script setup>
  import EntryForm from './forms/EntryForm.vue';
  import GoogleBooksLookupForm from "@/components/forms/GoogleBooksLookupForm.vue";
  import {watch} from "vue";

  const props = defineProps(['entry', 'categoryList']);
  const emit = defineEmits([
    'entrySubmit',
    'setEntry'
  ]);

  function showManualTab() {
    //! THIS SOMETIMES THROWS ERRORS
    let t = document.querySelector('#myTab li:first-child button');
    bootstrap.Tab.getInstance(t).show()
  }

  function cancelModal() {
    let m = bootstrap.Modal.getInstance(document.getElementById("entryEditModal"));
    m.hide();
    document.getElementById("entryForm").classList.remove('was-validated');
    showManualTab();
  }

  function entryFromkApi(book) {
    showManualTab();
    let info = book.volumeInfo;
    let fromApi = {
      imgUrl: info.imageLinks.thumbnail,
      title: info.title,
      author: info.authors.join(', '),
      isbn: info.industryIdentifiers[0].identifier,
      publisher: info.publisher,
      publishDate: info.publishedDate,
      status: "On Shelve",
      shelveLocation: "",
      description: info.description,
      categories: info.categories,
    };
    emit('setEntry', fromApi);
  }

  function submitEntry() {
    emit('entrySubmit');
    cancelModal();
  }
</script>

<template>
  <div class="modal fade" id="entryEditModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="entryEditModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header bg-primary">
          <h1 class="modal-title fs-5" id="entryEditModalLabel">
            <span v-if="!entry.isEdit" class="text-light">
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
              <button class="nav-link active fw-bold" id="manual-tab" data-bs-toggle="tab" data-bs-target="#manual" type="button" role="tab" aria-controls="manual" aria-selected="true"><i class="fa-solid fa-file-lines pe-2"></i>Manual Entry</button>
            </li>
            <li v-if="!entry.isEdit" class="nav-item" role="presentation">
              <button class="nav-link fw-bold" id="lookup-tab" data-bs-toggle="tab" data-bs-target="#lookup" type="button" role="tab" aria-controls="lookup" aria-selected="false"><i class="fa-solid fa-magnifying-glass pe-2"></i>Book Lookup</button>
            </li>
          </ul>
          <div class="tab-content" id="myTabContent">
            <div class="tab-pane fade show active" id="manual" role="tabpanel" aria-labelledby="lookup-tab">
              <EntryForm :entry="props.entry" :category-list="categoryList" :submit-entry="submitEntry"></EntryForm>
            </div>
            <div v-if="!props.entry.isEdit" class="tab-pane fade" id="lookup" role="tabpanel" aria-labelledby="lookup-tab">
              <GoogleBooksLookupForm :use-book="entryFromkApi"></GoogleBooksLookupForm>
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