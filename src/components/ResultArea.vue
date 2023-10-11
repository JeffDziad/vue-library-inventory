<script setup>
import {computed, ref} from "vue";
import EntryCard from "@/components/entry_formats/EntryCard.vue";
import EntryDetailModal from "@/components/EntryDetailModal.vue";

const props = defineProps(['entries', 'searchQuery', 'searchByFields', 'categoryList', "searchCategories", 'deleteEntry', 'updateEntry']);
let viewFormat = ref("detail");
let currentDetailEntry = ref({});

function setViewFormat(format) {
  viewFormat.value = format;
}

//! Searching should probably be done in App.vue
const refined = computed(() => {
  let selectedFields = props.searchByFields.split(',');
  let enteredFields = props.searchQuery.split(',');
  let r = [];

  //? Search by query
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

  //? Search by category
  //! SHOULD THIS BE AN 'AND' OR A 'OR'??
  let r2 = [];
  let count = 0;
  r.forEach((e) => {
    let match = true;
    props.searchCategories.every((c) => {
      if(e.categories.indexOf(c) === -1) {
        match = false;
      }
    });
    if(match) r2.push(e);
    count++;
  });
  return r2;
});

</script>

<template>
  <div class="row mt-3">
    <div class="col-12 mb-3 d-flex justify-content-between">
      <p class="bg-primary text-white rounded-3 text-center p-2 m-0">{{refined.length}} Result(s)</p>
      <div class="btn-group" role="group" aria-label="List Format">
        <button @click="setViewFormat('detail')" type="button" class="btn btn-primary" :class="{'active': viewFormat==='detail'}"><i class="fa-solid fa-list"></i></button>
        <button @click="setViewFormat('grid')" type="button" class="btn btn-primary" :class="{'active': viewFormat==='grid'}"><i class="fa-solid fa-border-all"></i></button>
      </div>
    </div>
    <hr class="border-5">
    <div class="col-12">
      <div v-if="refined.length <= 0" class="text-muted">
        <i style="font-size: 35px;" class="fa-solid fa-triangle-exclamation align-text-bottom"></i>
        <span style="font-size: 25px;" class="ps-3">No Entries Found...</span>
      </div>
    </div>
    <div v-for="entry in refined" class="mb-3" :class="{'col-12': (viewFormat==='detail'), 'col-auto': (viewFormat==='grid')}">
      <EntryCard :update-entry="updateEntry" :deleteEntry="deleteEntry" :category-list="categoryList" :entry="entry" :view-format="viewFormat" class="border-primary border border-2"></EntryCard>
    </div>
  </div>
</template>

<style scoped>

</style>