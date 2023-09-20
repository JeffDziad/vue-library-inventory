<script setup>
import {ref} from "vue";
import EntryList from "@/components/result_formats/EntryList.vue";

const props = defineProps(['entries']);
const emit = defineEmits(['openEditModal']);
let viewFormat = ref("detail");

function setViewFormat(format) {
  viewFormat.value = format;
}

function openEditModal(entry) {
  emit('openEditModal', entry);
}

// 1. Get sorting/filter properties from parent.
// 2. Get search string from parent.
// 3. Have computed property that takes into account the type of sorting and filtering and filter the entries array.
// 4. Use computed property down below...

</script>

<template>
  <div class="row mt-3">
    <div class="col-12 mb-3 d-flex justify-content-between">
      <span class="pt-3 ps-3">{{props.entries.length}} Results</span>
      <!--   These will toggle what type of view is presented, grid or detail list.   -->
      <div class="btn-group" role="group" aria-label="List Format">
        <button @click="setViewFormat('detail')" type="button" class="btn btn-primary" :class="{'active': viewFormat==='detail'}"><i class="fa-solid fa-list"></i></button>
        <button @click="setViewFormat('grid')" type="button" class="btn btn-primary" :class="{'active': viewFormat==='grid'}"><i class="fa-solid fa-border-all"></i></button>
      </div>
    </div>
    <hr>
    <!--  FILTER THIS FIRST, THIS IS NOT CORRECT  -->
    <EntryList @openEditModal="openEditModal" :entries="props.entries" :view-format="viewFormat"></EntryList>
  </div>
</template>

<style scoped>

</style>