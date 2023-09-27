<script setup>
  import BookAPI from '@/modules/googleBooksApi';
  const api = new BookAPI();
  api.getAllByISBN();
</script>

<template>

</template>

<style scoped>

</style>