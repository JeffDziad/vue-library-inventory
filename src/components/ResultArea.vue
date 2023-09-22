<script setup>
import {computed, ref} from "vue";
import EntryCard from "@/components/entry_formats/EntryCard.vue";
import EntryDetailModal from "@/components/EntryDetailModal.vue";

const props = defineProps(['entries', 'searchQuery', 'searchByFields', 'editEntry', 'deleteEntry']);
let viewFormat = ref("detail");
let currentDetailEntry = ref({});

function setViewFormat(format) {
  viewFormat.value = format;
}
function openDetailModal(entry) {
  currentDetailEntry.value = entry;
}

// SORTING SHOULD BE DONE HERE
const refined = computed(() => {
  // let bySearchQuery = props.entries.filter((e) => e.title.includes(props.searchQuery));
  // return bySearchQuery;

  let selectedFields = props.searchByFields.split(',');
  let enteredFields = props.searchQuery.split(',');
  let r = [];
  if(selectedFields.length===enteredFields.length && enteredFields && selectedFields) {
    for(let i = 0; i < props.entries.length; i++) {
      let e = props.entries[i];
      let match = true;
      let count = 0;
      for(let f of selectedFields) {
        if(!e[f].toUpperCase().includes(enteredFields[count].toUpperCase())) {
          match = false;
        }
        count++;
      }
      if(match) r.push(e);
    }
  }
  return r;
});

</script>

<template>
  <div class="row mt-3">
    <div class="col-12 mb-3 d-flex justify-content-between">
      <span class="pt-3 ps-3">{{refined.length}} Results</span>
      <!--   These will toggle what type of view is presented, grid or detail list.   -->
      <div class="btn-group" role="group" aria-label="List Format">
        <button @click="setViewFormat('detail')" type="button" class="btn btn-primary" :class="{'active': viewFormat==='detail'}"><i class="fa-solid fa-list"></i></button>
        <button @click="setViewFormat('grid')" type="button" class="btn btn-primary" :class="{'active': viewFormat==='grid'}"><i class="fa-solid fa-border-all"></i></button>
      </div>
    </div>
    <hr>
    <div class="col-12">
      <div v-if="props.entries.length <= 0">
        <p class="h3">No Entries Found...</p>
      </div>
    </div>
    <div v-for="entry in refined" class="mb-3" :class="{'col-12': (viewFormat==='detail'), 'col-auto': (viewFormat==='grid')}">
      <EntryCard :detailEntry="openDetailModal" :deleteEntry="deleteEntry" :editEntry="editEntry" :entry="entry" :view-format="viewFormat" class="border-primary border border-2"></EntryCard>
    </div>
    <EntryDetailModal ref="entryDetailModal" :editEntry="editEntry" :deleteEntry="deleteEntry" :entry="currentDetailEntry" :view-format="viewFormat"></EntryDetailModal>
  </div>
</template>

<style scoped>

</style>