<script setup>

import EntryForm from "@/components/forms/EntryForm.vue";
import GoogleBooksLookupForm from "@/components/forms/GoogleBooksLookupForm.vue";
import {onMounted, ref} from "vue";
import BasicModal from "@/components/BasicModal.vue";

const manualTrigger = ref(null);
const manualButton = ref(null);
const basicModal = ref(null);
const bsModal = ref({});
const props = defineProps(['id', 'categoryList']);
const emit = defineEmits([
  'addEntry',
]);

const newEntryObj = ref({
  imgUrl: "",
  title: "",
  author: "",
  isbn: "",
  publisher: "",
  publishDate: "",
  status: "On Shelve",
  shelveLocation: "",
  description: "",
  categories: [],
});

//! Maybe move this to googleBooksApi.js
function entryFromkApi(book) {
  manualTrigger.value.show();
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
  newEntryObj.value = fromApi;
}

function submitEntry() {
  emit('addEntry', newEntryObj.value);
  newEntryObj.value = {
    imgUrl: "",
    title: "",
    author: "",
    isbn: "",
    publisher: "",
    publishDate: "",
    status: "On Shelve",
    shelveLocation: "",
    description: "",
    categories: [],
  };
  bsModal.value.hide();
}

onMounted(() => {
  bsModal.value = new bootstrap.Modal(document.getElementById(props.id));
  manualTrigger.value = new bootstrap.Tab(document.getElementById("manual-tab"));

  document.getElementById(props.id).addEventListener('hidden.bs.modal', () => {
    manualTrigger.value.show();
  });
})
</script>

<template>
  <button class="btn btn-primary" type="button" data-bs-toggle="modal" :data-bs-target="'#' + id"><i class="fa-solid fa-plus"></i>&nbsp;Add Entry</button>

  <BasicModal :id="id" title="Add Entry" icon="fa-solid fa-plus">
    <ul class="nav nav-tabs mb-3" id="addEntryModalTabs" role="tablist">
      <li class="nav-item" role="presentation">
        <button class="nav-link active fw-bold" id="manual-tab" data-bs-toggle="tab" data-bs-target="#manual" type="button" role="tab" aria-controls="manual" aria-selected="true"><i class="fa-solid fa-file-lines pe-2"></i>Manual Entry</button>
      </li>
      <li v-if="!newEntryObj.isEdit" class="nav-item" role="presentation">
        <button class="nav-link fw-bold" id="lookup-tab" data-bs-toggle="tab" data-bs-target="#lookup" type="button" role="tab" aria-controls="lookup" aria-selected="false"><i class="fa-solid fa-magnifying-glass pe-2"></i>Book Lookup</button>
      </li>
    </ul>
    <div class="tab-content" id="addEntryModalTabContent">
      <div class="tab-pane fade show active" id="manual" role="tabpanel" aria-labelledby="lookup-tab">
        <EntryForm :id="'entryAddForm-'" :entry="newEntryObj" :category-list="categoryList" :submit-entry="submitEntry"></EntryForm>
      </div>
      <div v-if="!newEntryObj.isEdit" class="tab-pane fade" id="lookup" role="tabpanel" aria-labelledby="lookup-tab">
        <GoogleBooksLookupForm :use-book="entryFromkApi"></GoogleBooksLookupForm>
      </div>
    </div>
    <template #footer>
      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
      <button type="submit" form="entryAddForm--entryForm"  class="btn btn-primary">Save</button>
    </template>
  </BasicModal>
<!--  <div class="modal fade" id="entryEditModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="entryEditModalLabel" aria-hidden="true">-->
<!--    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">-->
<!--      <div class="modal-content">-->
<!--        <div class="modal-header bg-primary">-->
<!--          <h1 class="modal-title fs-5" id="entryEditModalLabel">-->
<!--            <span v-if="!entry.isEdit" class="text-light">-->
<!--              <i class="fa-solid fa-plus"></i>&nbsp;Add Entry-->
<!--            </span>-->
<!--          </h1>-->
<!--          <button @click="cancelModal" type="button" class="btn-close bg-light" data-bs-dismiss="modal" aria-label="Close"></button>-->
<!--        </div>-->
<!--        <div class="modal-body">-->
<!--          <ul class="nav nav-tabs mb-3" id="myTab" role="tablist">-->
<!--            <li class="nav-item" role="presentation">-->
<!--              <button class="nav-link active fw-bold" id="manual-tab" data-bs-toggle="tab" data-bs-target="#manual" type="button" role="tab" aria-controls="manual" aria-selected="true"><i class="fa-solid fa-file-lines pe-2"></i>Manual Entry</button>-->
<!--            </li>-->
<!--            <li v-if="!entry.isEdit" class="nav-item" role="presentation">-->
<!--              <button class="nav-link fw-bold" id="lookup-tab" data-bs-toggle="tab" data-bs-target="#lookup" type="button" role="tab" aria-controls="lookup" aria-selected="false"><i class="fa-solid fa-magnifying-glass pe-2"></i>Book Lookup</button>-->
<!--            </li>-->
<!--          </ul>-->
<!--          <div class="tab-content" id="myTabContent">-->
<!--            <div class="tab-pane fade show active" id="manual" role="tabpanel" aria-labelledby="lookup-tab">-->
<!--              <EntryForm :entry="props.entry" :category-list="categoryList" :submit-entry="submitEntry"></EntryForm>-->
<!--            </div>-->
<!--            <div v-if="!props.entry.isEdit" class="tab-pane fade" id="lookup" role="tabpanel" aria-labelledby="lookup-tab">-->
<!--              <GoogleBooksLookupForm :use-book="entryFromkApi"></GoogleBooksLookupForm>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--        <div class="modal-footer d-flex justify-content-between">-->
<!--          <button @click="cancelModal" type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>-->
<!--          <button type="submit" form="entryForm" class="btn btn-primary">Save</button>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
</template>

<style scoped>

</style>