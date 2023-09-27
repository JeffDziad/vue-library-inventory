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

//! SORTING SHOULD BE DONE HERE
const refined = computed(() => {
  let selectedFields = props.searchByFields.split(',');
  let enteredFields = props.searchQuery.split(',');
  let r = [];
  if(enteredFields && selectedFields) {
    for(let i = 0; i < props.entries.length; i++) {
      let e = props.entries[i];
      let match = true;
      for(let j = 0; j < enteredFields.length; j++) {
        let f = selectedFields[j];
        if(!e[f].toUpperCase().includes(enteredFields[j].toUpperCase())) {
          match = false;
        }
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
      <span class="pt-3 ps-3">{{refined.length}} Result(s)</span>
      <div class="btn-group" role="group" aria-label="List Format">
        <button @click="setViewFormat('detail')" type="button" class="btn btn-primary" :class="{'active': viewFormat==='detail'}"><i class="fa-solid fa-list"></i></button>
        <button @click="setViewFormat('grid')" type="button" class="btn btn-primary" :class="{'active': viewFormat==='grid'}"><i class="fa-solid fa-border-all"></i></button>
      </div>
    </div>
    <hr>
    <div class="col-12">
      <div v-if="refined.length <= 0" class="text-muted">
        <i style="font-size: 35px;" class="fa-solid fa-triangle-exclamation align-text-bottom"></i>
        <span style="font-size: 25px;" class="ps-3">No Entries Found...</span>
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