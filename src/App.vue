<script setup>
import {computed, onMounted, ref, watch} from 'vue';
  import ResultArea from "@/components/ResultArea.vue";
  import EntryDeleteModal from "@/components/EntryDeleteModal.vue";
  import EntryEditModal from "@/components/EntryEditModal.vue";

  const entryEditModal = ref(null);
  const entries = ref([]);
  const currentDeleteTitle = ref("");
  const currentDeleteISBN = ref("");

  // Search
  const searchQuery = ref("");
  const searchByFields = ['title', 'author', 'isbn', 'publisher', 'publishDate', 'status', 'shelveLocation', 'description'];
  const searchByFieldsChecked = ref({});
  const searchPlaceholder = computed(() => {
    let out = "";
    for(const key in searchByFieldsChecked.value) {
      if(searchByFields.includes(key)) {
        if(searchByFieldsChecked.value[key]) out += key + ",";
      }
    }
    if(out === "") out = "title";
    else  out = out.slice(0, -1);
    return out;
  });

  // Local Storage
  onMounted(() => {
    let list = localStorage.getItem('entries');
    if(list) entries.value = JSON.parse(list);
    else entries.value = [];
  })
  watch(
      () => entries,
      (newValue) => {
        localStorage.setItem('entries', JSON.stringify(newValue.value));
      },
      { deep: true }
  )

  // Functions
  function getEntryFromISBN(isbn) {
    return entries.value.find(e => e.isbn === isbn);
  }
  function saveEntry(entry) {
    let exists = getEntryFromISBN(entry.isbn);
    if(exists) {
      console.log('updating');
      let index = entries.value.indexOf(exists);
      entries[index] = entry;
    } else {
      entries.value.push(entry);
    }
  }

  //! TRY TO FIX THE ISSUE OF THE ENTRY BEING CHANGED BEFORE HITTING SAVE IN MODAL
  function editEntry(entry) {
    entry.isEdit = true;
    entryEditModal.value.populateFields(entry);
  }
  function promptForDelete(entry) {
    currentDeleteTitle.value = entry.title;
    currentDeleteISBN.value = entry.isbn;
  }
  function deleteEntry(isbn) {
    let e = getEntryFromISBN(isbn);
    let i = entries.value.indexOf(e);
    entries.value.splice(i, 1);
  }
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col-6">
        <div class="input-group my-3">
          <input v-model="searchQuery" type="text" :placeholder="(searchPlaceholder==='title')?'Start typing to search...':searchPlaceholder" class="form-control" aria-label="Search" aria-describedby="searchBtn">
        </div>
      </div>
      <div class="col-6 d-flex justify-content-end align-items-center">
        <button class="btn btn-primary" type="button" data-bs-toggle="modal" data-bs-target="#entryEditModal"><i class="fa-solid fa-plus"></i>&nbsp;Add Entry</button>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div class="accordion accordion-flush border rounded" id="sortFilterAccordion">
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                <i class="fa-solid fa-sliders"></i>&nbsp; Search Options
              </button>
            </h2>
            <div id="flush-collapseOne" class="accordion-collapse collapse" data-bs-parent="#sortFilterAccordion">
              <div class="accordion-body">
                <div class="row">
                  <div class="col">
                    <h5>Advanced Search</h5>
                    <div class="px-2">
                      <div v-for="field in searchByFields">
                        <input type="checkbox" v-model="searchByFieldsChecked[field]">
                        <label class="ps-1">{{field}}</label>
                      </div>
                    </div>
                  </div>
                  <div class="col">
                    <h5>Filter</h5>
                    <div>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ResultArea :deleteEntry="promptForDelete" :searchByFields="searchPlaceholder" :editEntry="editEntry" :entries="entries" :search-query="searchQuery"></ResultArea>
  </div>

  <EntryEditModal ref="entryEditModal" @entrySubmit="saveEntry"></EntryEditModal>
  <EntryDeleteModal :title="currentDeleteTitle" :isbn="currentDeleteISBN" :deleteSelf="deleteEntry"></EntryDeleteModal>
</template>

<style scoped>

</style>
