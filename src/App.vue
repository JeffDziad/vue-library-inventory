<script setup>
  import {computed, onMounted, ref, watch} from 'vue';
  import ResultArea from "@/components/ResultArea.vue";
  import EntryDeleteModal from "@/components/EntryDeleteModal.vue";
  import EntryEditModal from "@/components/EntryEditModal.vue";

  const entryEditModal = ref(null);
  const entries = ref([]);
  const currentDeleteTitle = ref("");
  const currentDeleteISBN = ref("");

  const currentEditEntry = ref({});
  //! IF I DO THE GOOGLE BOOKS API, MAKE SURE THE FIELDS MATCH
  const newEntryObj = {
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
  //! ADD EDITION FIELD
  //! ADD CATEGORIES FIELD AT SOME POINT - use select with checkboxes to select multiple categories
  //! - include a way to add a category to the possible categories.

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


  onMounted(() => {
    loadFromLocalStorage();
    //! Maybe create a list of all categories here so when you add an entry, it can have a list of already used Categories.
    //! Additionally - allow users to specify their own categories that will show up as an option for future use.
  })

  //! Save categories separatly in localstorage and create a watcher to watch categories array ref.
  //! When a user adds a new entry with a new category, add it to the users category list to have it updated in local storage.
  watch(
      () => entries,
      (newValue) => {
        localStorage.setItem('entries', JSON.stringify(newValue.value));
      },
      { deep: true }
  );

  function loadFromLocalStorage() {
    let list = localStorage.getItem('entries');
    if(list) entries.value = JSON.parse(list);
    else entries.value = [];
  }
  function getEntryFromISBN(isbn) {
    return entries.value.find(e => e.isbn === isbn);
  }
  function saveEntry() {
    let exists = getEntryFromISBN(currentEditEntry.value.isbn);
    if(exists) {
      let index = entries.value.indexOf(exists);
      entries.value[index] = currentEditEntry.value;
    } else {
      entries.value.push(currentEditEntry.value);
    }
  }
  function addEntry() {
    currentEditEntry.value = JSON.parse(JSON.stringify(newEntryObj));
  }
  function editEntry(entry) {
    entry.isEdit = true;
    currentEditEntry.value = JSON.parse(JSON.stringify(entry));
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
  function camelCaseToReadable(str) {
    let words = [];
    let word = "";
    str+="X";
    for(let i = 0; i<str.length; i++) {
      if(str[i] === str[i].toUpperCase()) {
        words.push(word);
        word = "";
      }
      if(i === 0) {
        word += str[i].toUpperCase();
      } else word += str[i];
    }
    return words.join(' ');
  }
  function clearSearchByFieldsChecked() {
    searchByFieldsChecked.value = {};
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
        <button @click="addEntry" class="btn btn-primary" type="button" data-bs-toggle="modal" data-bs-target="#entryEditModal"><i class="fa-solid fa-plus"></i>&nbsp;Add Entry</button>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div class="accordion border border-2 rounded rounded-2 border-primary" id="sortFilterAccordion">
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                <i class="fa-solid fa-sliders"></i>&nbsp; Search Options
              </button>
            </h2>
            <div id="flush-collapseOne" class="accordion-collapse collapse" data-bs-parent="#sortFilterAccordion">
              <div class="accordion-body">
                <div class="row">
                  <div class="col-lg-6 col-md-12 mb-4 mb-md-0">
                    <h5 class="fw-bold">Advanced Search</h5>
                    <div class="px-2">
                      <div v-for="field in searchByFields">
                        <div class="form-check">
                          <input v-model="searchByFieldsChecked[field]" class="form-check-input border-primary border" type="checkbox" value="" :id="'advSearch'+field">
                          <label class="form-check-label" :for="'advSearch'+field">
                            {{camelCaseToReadable(field)}}
                          </label>
                        </div>
                      </div>
                    </div>
                    <p class="mb-2 small fw-lighter">*Make sure to add a <b class="h5">COMMA</b> between each entered field.</p>
                    <button @click="clearSearchByFieldsChecked" type="button" class="btn btn-primary btn-sm">Clear</button>
                  </div>
                  <div class="col-lg-6 col-md-12 mb-md-2">
                    <h5 class="fw-bold">Sort/Filter</h5>
                    <div>
                    <!-- Region: SortFilterTesting -->
                      <div class="form-floating h-75">
                        <select class="form-select" id="floatingSelectGrid">
                          <option selected>All</option>
                          <option value="1">On Shelve</option>
                          <option value="2">Checked Out</option>
                          <option value="3">Discontinued</option>
                        </select>
                        <label for="floatingSelectGrid">Status</label>
                      </div>
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
  <EntryEditModal ref="entryEditModal" :entry="currentEditEntry" @entrySubmit="saveEntry"></EntryEditModal>
  <EntryDeleteModal :title="currentDeleteTitle" :isbn="currentDeleteISBN" :deleteSelf="deleteEntry"></EntryDeleteModal>
</template>

<style scoped>

</style>
