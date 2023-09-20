<script setup>
import EntryCard from "@/components/entry_formats/EntryCard.vue";
import EntryDetailModal from "@/components/EntryDetailModal.vue";
import {ref} from "vue";

const props = defineProps(['entries', 'viewFormat']);
const emit = defineEmits(['openEditModal']);
let entryDetailModal = ref(null);
let currentDetailEntry = ref({});

function openDetailModal(entryISBN) {
  let entry = props.entries.find(e => e.isbn === entryISBN);
  if(entry) {
    currentDetailEntry.value = entry;
  }
}
function openEditModal(entryISBN) {
  let entry = props.entries.find(e => e.isbn === entryISBN);
  if(entry) {
    emit('openEditModal', entry);
  }
}
</script>

<template>
  <div v-for="entry in props.entries" class="mb-3" :class="{'col-12': (viewFormat==='detail'), 'col-auto': (viewFormat==='grid')}">
    <EntryCard @openDetailModal="openDetailModal" @openEditModal="openEditModal" :entry="entry" :view-format="viewFormat"></EntryCard>
  </div>

<!-- Either put a detail modal here that is populated when an entry card is clicked, or store it in the entry card component. -->
<!-- Storing it inside the component will make it less efficient as each entry card will render its own modal for details. -->
  <EntryDetailModal ref="entryDetailModal" :entry="currentDetailEntry" :view-format="viewFormat"></EntryDetailModal>
</template>

<style scoped>

</style>