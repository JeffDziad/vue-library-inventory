<script setup>
  import {ref} from 'vue';
  import EntryEditModal from "@/components/EntryEditModal.vue";
  import ResultArea from "@/components/ResultArea.vue";

  const entryEditModal = ref(null);
  const entries = ref([]);

  function saveEntry(entry) {
    let exists = entries.value.find(e => e.isbn === entry.isbn);
    if(exists) {
      let index = entries.value.indexOf(exists);
      entries[index] = entry;
    } else {
      entries.value.push(entry);
    }
  }

  function editEntry(entry) {
    entry.isEdit = true;
    entryEditModal.value.populateFields(entry);
  }
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col-6">
        <div class="input-group my-3">
          <input type="text" class="form-control" placeholder="Search" aria-label="Search" aria-describedby="searchBtn">
          <button class="btn btn-primary text-light" type="button" id="searchBtn"><i class="fa-solid fa-magnifying-glass"></i></button>
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
                <i class="fa-solid fa-filter"></i>&nbsp; Sort/Filter
              </button>
            </h2>
            <div id="flush-collapseOne" class="accordion-collapse collapse" data-bs-parent="#sortFilterAccordion">
              <div class="accordion-body">
                <div class="row">
                  <div class="col">
                    <h4>Sort</h4>
                  </div>
                  <div class="col">
                    <h4>Filter</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ResultArea @openEditModal="editEntry" :entries="entries"></ResultArea>
  </div>

  <EntryEditModal ref="entryEditModal" @entrySubmit="saveEntry"></EntryEditModal>
</template>

<style scoped>

</style>
