<script setup>
import EntryDetailCard from "@/components/entry_formats/EntryDetailCard.vue";

const props = defineProps(['entries']);
</script>

<template>
  <div v-for="entry in props.entries" class="col-12 mb-3">
    <EntryDetailCard :entry="entry"></EntryDetailCard>
  </div>
</template>

<style scoped>

</style>