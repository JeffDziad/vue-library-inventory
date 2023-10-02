<script setup>
  import {computed} from "vue";

  const props = defineProps(['book', 'useBook']);

  const info = computed(() => {
    return props.book.volumeInfo;
  });
</script>

<template>
  <a @click="useBook(book)">
    <div class="col-12 card mb-3 p-2 border-primary border-2">
      <div class="row">
        <div class="col-5">
          <img v-if="info.imageLinks" class="thumbnail-cover" :src="info.imageLinks.smallThumbnail" alt="Google Book">
          <img v-else class="thumbnail-cover" src="https://blog.springshare.com/wp-content/uploads/2010/02/nc-md.gif" alt="No image available">
        </div>
        <div class="col-7 px-3">
          <h4>{{info.title}}</h4>
          <span v-for="(a, i) in info.authors">{{a}} {{(i+1 < info.authors.length)?' | ':''}}</span>
        </div>
      </div>
    </div>
  </a>

</template>

<style scoped>
  .card {
    cursor: pointer;
    transition: all
  }
</style>