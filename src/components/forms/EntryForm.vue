<script setup>
import {ref} from "vue";
import CategoryPicker from "@/components/CategoryPicker.vue";

const props = defineProps(['entry', 'submitEntry', 'categoryList']);
const form = ref(null);

function submit() {
  if(!form.value.checkValidity()) {
    document.getElementById("entryForm").classList.add('was-validated');
  } else {
    props.submitEntry();
  }
}

function newCategory(c) {
  props.entry.categories.push(c);
}
</script>

<template>
  <form ref="form" id="entryForm" class="" @submit.prevent="submit" novalidate>
    <div class="input-group mb-3">
      <label class="input-group-text fw-bolder" for="newEntryImage">Cover Image URL</label>
      <input v-model="props.entry.imgUrl" type="text" class="form-control" id="newEntryImage">
    </div>
    <div class="input-group has-validation mb-3">
      <span class="input-group-text fw-bolder" id="newEntryTitle">Title</span>
      <input v-model="props.entry.title" type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" required>
      <div class="invalid-feedback">
        Required
      </div>
    </div>
    <div class="input-group mb-3">
      <span class="input-group-text fw-bolder" id="newEntryAuthor">Author</span>
      <input v-model="props.entry.author" type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
    </div>
    <div class="input-group has-validation" :class="{'mb-3': props.entry.isEdit}">
      <span class="input-group-text fw-bolder" id="newEntryISBN">ISBN</span>
      <input v-model="props.entry.isbn" :disabled="props.entry.isEdit" type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" required>
      <div class="invalid-feedback">
        Required
      </div>
    </div>
    <div v-if="!props.entry.isEdit" class="input-group"><p class="mb-2 ps-2 small fw-lighter">*This cannot be changed later!</p></div>
    <div class="input-group mb-3">
      <span class="input-group-text fw-bolder" id="newEntryPublisher">Publisher</span>
      <input v-model="props.entry.publisher" type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
    </div>
    <div class="input-group mb-3">
      <span class="input-group-text fw-bolder" id="newEntryPublishDateLabel">Publish Date</span>
      <input v-model="props.entry.publishDate" id="newEntryPublishDate" class="form-control" type="date" />
    </div>
    <div class="input-group mb-3">
      <span class="input-group-text fw-bolder" id="newEntryStatus">Status</span>
      <select v-model="props.entry.status" class="form-select" aria-label="Default select example">
        <option value="On Shelve">On Shelve</option>
        <option value="Checked Out">Checked Out</option>
        <option value="Discontinued">Discontinued</option>
      </select>
    </div>
    <div class="input-group mb-3">
      <span class="input-group-text fw-bolder" id="newEntryLocation">Shelve Location</span>
      <input v-model="props.entry.shelveLocation" type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
    </div>
    <CategoryPicker class="mb-3" :category-list="categoryList" :entry-categories="entry.categories" :new-category-func="newCategory"></CategoryPicker>
    <div class="form-floating">
      <textarea v-model="props.entry.description" class="form-control" placeholder="Leave a comment here" id="newEntryDescription" rows="5" style="height: 100%;"></textarea>
      <label class="fw-bolder" for="newEntryDescription">Description/Summary</label>
    </div>
  </form>
</template>

<style scoped>

</style>