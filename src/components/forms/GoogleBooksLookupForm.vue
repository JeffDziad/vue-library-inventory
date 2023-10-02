<script setup>
  import BookAPI from '@/modules/googleBooksApi';
  import {computed, ref} from "vue";
  import GoogleBookItem from "@/components/forms/GoogleBookItem.vue";
  const api = new BookAPI();

  const props = defineProps(['useBook'])
  const keyword = ref('');
  const searchQuery = ref('');
  const latestQuery = ref('');
  const searchResults = ref({});
  const loading = ref(false);

  async function search() {
    latestQuery.value = searchQuery.value;
    loading.value = true;
    let books = await api.search(keyword.value, searchQuery.value);
    loading.value = false;
    if(books.totalItems > 0) {
      searchResults.value = books;
    } else searchResults.value = {};
  }
</script>

<template>
  <div>
    <select v-model="keyword" class="form-select mb-3" aria-label="Default select example">
      <option v-for="(key, i) in api.keywords" :value="key" :selected="(i === 0)?'selected':false" :key="i">{{key}}</option>
    </select>
    <div class="input-group mb-3">
      <input v-model="searchQuery" :disabled="!keyword" type="text" class="form-control" :placeholder="(keyword)?'Searching by ' + keyword:'Please select a search keyword...'" aria-label="Search by Title" aria-describedby="bookApiSearchBtn">
      <button @click="search" class="btn btn-primary" type="button" id="bookApiSearchBtn"><i class="fa-solid fa-magnifying-glass"></i></button>
    </div>
    <hr>
    <div v-if="loading" class="d-flex justify-content-center">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <div v-if="!loading" class="row px-2">
      <div v-if="searchResults.items && searchResults.totalItems > 0">
        <p class="h5">Results for '{{latestQuery}}'</p>
        <GoogleBookItem  v-for="b in searchResults.items" :book="b" :use-book="useBook"></GoogleBookItem>
      </div>
      <div v-else>
        <p class="h5">Nothing to see here...</p>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>