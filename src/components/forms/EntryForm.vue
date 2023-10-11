<script setup>
import {ref} from "vue";
import CategoryPicker from "@/components/CategoryPicker.vue";

const props = defineProps({
  id: {
    type: String,
    required: true
  },
  isEdit: {
    type: Boolean,
    default: false,
  },
  entry: {
    type: Object
  },
  submitEntry: {
    type: Function
  },
  categoryList: {
    type: Array
  }
});
const form = ref(null);

function submit() {
  if(!form.value.checkValidity()) {
    console.log("Entry Form - invalid", form.value.checkValidity());
    document.getElementById(uid('entryForm')).classList.add('was-validated');
  } else {
    console.log("Entry Form - valid");
    props.submitEntry();
  }
}

function uid(id) {
  return props.id + '-' + id;
}

function newCategory(c) {
  props.entry.categories.push(c);
}
</script>

<template>
  <form ref="form" :id="uid('entryForm')" class="needs-validation" @submit.prevent="submit" novalidate>
    <div class="input-group mb-3">
      <label class="input-group-text fw-bolder" :for="uid('entryFormImageUrl')">Cover Image URL</label>
      <input v-model="props.entry.imgUrl" type="text" class="form-control" :id="uid('entryFormImageUrl')">
    </div>
    <div class="input-group has-validation mb-3">
      <span class="input-group-text fw-bolder" :id="uid('entryFormTitle')">Title</span>
      <input v-model="props.entry.title" type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" required>
      <div class="invalid-feedback">
        Required
      </div>
    </div>
    <div class="input-group mb-3">
      <span class="input-group-text fw-bolder" :id="uid('entryFormAuthor')">Author</span>
      <input v-model="props.entry.author" type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
    </div>
    <div class="input-group has-validation" :class="{'mb-3': props.isEdit}">
      <span class="input-group-text fw-bolder" :id="uid('entryFormISBN')">ISBN</span>
      <input v-model="props.entry.isbn" :disabled="props.isEdit" type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" required>
      <div class="invalid-feedback">
        Required
      </div>
    </div>
    <div v-if="!props.isEdit" class="input-group"><p class="mb-2 ps-2 small fw-lighter">*This cannot be changed later!</p></div>
    <div class="input-group mb-3">
      <span class="input-group-text fw-bolder" :id="uid('entryFormPublisher')">Publisher</span>
      <input v-model="props.entry.publisher" type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
    </div>
    <div class="input-group mb-3">
      <span class="input-group-text fw-bolder" :id="uid('entryFormPublishDate')">Publish Date</span>
      <input v-model="props.entry.publishDate" :id="uid('entryFormPublishDate')" class="form-control" type="date" />
    </div>
    <div class="input-group mb-3">
      <span class="input-group-text fw-bolder" :id="uid('entryFormShelveStatus')">Status</span>
      <select v-model="props.entry.status" class="form-select" aria-label="Default select example">
        <option value="On Shelve">On Shelve</option>
        <option value="Checked Out">Checked Out</option>
        <option value="Discontinued">Discontinued</option>
      </select>
    </div>
    <div class="input-group mb-3">
      <span class="input-group-text fw-bolder" :id="uid('entryFormShelveLocation')">Shelve Location</span>
      <input v-model="props.entry.shelveLocation" type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
    </div>
    <CategoryPicker class="mb-3" :category-list="categoryList" :entry-categories="entry.categories" :new-category-func="newCategory"></CategoryPicker>
    <div class="form-floating">
      <textarea v-model="props.entry.description" class="form-control" placeholder="Leave a comment here" :id="uid('entryFormDescription')" rows="5" style="height: 100%;"></textarea>
      <label class="fw-bolder" for="newEntryDescription">Description/Summary</label>
    </div>
  </form>
</template>

<style scoped>

</style>