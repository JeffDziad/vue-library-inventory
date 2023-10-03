<script setup>
  import {computed, onMounted, ref, watch} from 'vue';
  import ResultArea from "@/components/ResultArea.vue";
  import EntryDeleteModal from "@/components/EntryDeleteModal.vue";
  import EntryEditModal from "@/components/EntryEditModal.vue";
  import CategoryPicker from "@/components/CategoryPicker.vue";
  const entryEditModal = ref(null);
  const entries = ref([]);
  const currentDeleteTitle = ref("");
  const currentDeleteISBN = ref("");
  const currentEditEntry = ref({});

  //! Add way to track what books someone is reading.
  //! Add a isReading bool that tracks whether the user is currently reading that book.
  //! If they are, be able to sort on those books, perhaps set the border of the card to blue to indicate its currently being read.
  //! Inside the detail modal, if they are reading it, enabled the reading log and allow them to track their reading progress.
  //! put a progress bar to indicate how much they have read.
  //! When the isReading value is false, lock the ability to add entries to the log.
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
    categories: [],
  };
  const defaultCategories = ['Fiction', 'Non-Fiction', 'Romance', 'Mystery', 'Sci-Fi', 'Poetry', 'Fantasy', 'Biography',
    'Young Adult', "Children's Literature", 'Literary Fiction', 'Graphic Novel'];

  // Search
  const searchQuery = ref("");
  const searchByFields = ['title', 'author', 'isbn', 'publisher', 'publishDate', 'status', 'shelveLocation', 'description'];
  const searchByFieldsChecked = ref({});
  const searchCategories = ref([]);
  const searchPlaceholder = computed(() => {
    let out = "";
    for(const key in searchByFieldsChecked.value) {
      if(searchByFields.includes(key)) {
        if(searchByFieldsChecked.value[key]) out += key + ",";
      }
    }
    if(out === "") out = "title";
    else out = out.slice(0, -1);
    return out;
  });
  const isMultiSearch = computed(() => {
    let count = 0;
    for(let s in searchByFieldsChecked.value) {
      if(searchByFieldsChecked.value[s]) count++;
      if(count >= 2) return true;
    }
  });

  onMounted(() => {
    loadFromLocalStorage();
  })

  watch(
      () => entries,
      (newValue) => {
        localStorage.setItem('entries', JSON.stringify(newValue.value));
      },
      { deep: true }
  );

  const categories = computed(() => {
    let out = defaultCategories;
    for(let e of entries.value) {
      for(let c of e.categories) {
        if(out.indexOf(c) === -1) {
          out.push(c);
        }
      }
    }
    return out;
  });

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
  function setEditEntry(obj) {
    currentEditEntry.value = obj;
  }

  //! addEntry and editEntry could be replaced by setCurrentEditEntry(x) where x is either an already existing entry or the newEntryObj
  //!   passed in for new entries. currently, this is a misrepresentation of what the functions actual duties are.
  function addEntry() {
    // currentEditEntry.value = JSON.parse(JSON.stringify(newEntryObj));
    currentEditEntry.value = JSON.parse(JSON.stringify({...newEntryObj}));
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
  <div id="wrapper" class="container">
    <div class="row">
      <div class="col-6 my-3">
        <div class="input-group">
          <input v-model="searchQuery" type="text" :placeholder="(searchPlaceholder==='title')?'Start typing to search...':searchPlaceholder" class="form-control" aria-label="Search" aria-describedby="searchBtn">
        </div>
        <p v-if="isMultiSearch" class="mb-2 small fw-lighter">*Make sure to add a <b class="h5">COMMA</b> between each entered field.</p>
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
                    <button @click="clearSearchByFieldsChecked" type="button" class="btn btn-primary btn-sm mt-2">Clear</button>
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
                    <div class="mt-3">
                      <CategoryPicker :entry-categories="searchCategories" :category-list="categories"></CategoryPicker>
                      <div class="row mt-1">
                        <div class="col d-flex justify-content-between">
                          <button @click="searchCategories = []" class="btn btn-primary btn-sm p-1">Clear</button>
                          <div class="btn-group" role="group" aria-label="List Format">
                            <button @click="" type="button" class="btn btn-sm btn-primary p-1">AND</button>
                            <button @click="" type="button" class="btn btn-sm btn-primary p-1">OR</button>
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
      </div>
    </div>
    <ResultArea :deleteEntry="promptForDelete" :searchByFields="searchPlaceholder" :search-categories="searchCategories" :editEntry="editEntry" :entries="entries" :search-query="searchQuery"></ResultArea>
  </div>


<!-- Put all modals in a single modal component -->
  <EntryEditModal ref="entryEditModal" :entry="currentEditEntry" :category-list="categories" @entrySubmit="saveEntry" @set-entry="setEditEntry"></EntryEditModal>
  <EntryDeleteModal :title="currentDeleteTitle" :isbn="currentDeleteISBN" :deleteSelf="deleteEntry"></EntryDeleteModal>
</template>

<style scoped>
#wrapper {
  background: rgba(255, 255, 255, 0.35);
}
</style>
