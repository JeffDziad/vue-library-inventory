<script setup>
import CategoryPicker from "@/components/CategoryPicker.vue";
import EntryAddModal from "@/components/EntryAddModal.vue";


</script>

<template>
  <div class="row">
    <div class="col-6 my-3">
      <div class="input-group">
        <input v-model="searchQuery" type="text" :placeholder="(searchPlaceholder==='title')?'Start typing to search...':searchPlaceholder" class="form-control border-primary border-2" aria-label="Search" aria-describedby="searchBtn">
      </div>
      <p v-if="isMultiSearch" class="mb-2 small fw-lighter">*Make sure to add a <b class="h5">COMMA</b> between each entered field.</p>
    </div>
    <div class="col-6 d-flex justify-content-end align-items-center">
      <!--        <button @click="addEntry" class="btn btn-primary" type="button" data-bs-toggle="modal" data-bs-target="#entryEditModal"><i class="fa-solid fa-plus"></i>&nbsp;Add Entry</button>-->
      <EntryAddModal id="addEntryModal" @add-entry="saveEntry" :category-list="categories"></EntryAddModal>
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
</template>

<style scoped>

</style>