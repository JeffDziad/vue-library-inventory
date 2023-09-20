<script setup>
import {ref} from "vue";

const props = defineProps(['entry', 'viewFormat']);
const emit = defineEmits([
  'openDetailModal',
  'openEditModal'
]);

function openDetailModal() {
  emit('openDetailModal', props.entry.isbn);
}
function openEditModal() {
  emit('openEditModal', props.entry.isbn);
}
</script>

<template>
  <div class="card">
    <div class="card-body">

      <!--   Grid View   -->
      <div v-if="viewFormat==='grid'">
        <a @click="openDetailModal" class="entry-detail-btn text-reset text-decoration-none" data-bs-toggle="modal" data-bs-target="#entryDetailModal">
          <img v-if="props.entry.imgUrl !== ''" class="img-fluid thumbnail-cover" :src="props.entry.imgUrl" :alt="props.entry.title">
          <img v-else class="thumbnail-cover" src="https://blog.springshare.com/wp-content/uploads/2010/02/nc-md.gif" alt="No image available">
        </a>
      </div>

      <!--   Detail View   -->
      <div v-if="viewFormat==='detail'" class="row">
        <div class="col">
          <div class="row">
            <div class="col-auto">
              <a @click="openDetailModal" class="entry-detail-btn text-reset text-decoration-none" data-bs-toggle="modal" data-bs-target="#entryDetailModal">
                <img v-if="props.entry.imgUrl !== ''" class="img-fluid thumbnail-cover" :src="props.entry.imgUrl" :alt="props.entry.title">
                <img v-else class="thumbnail-cover" src="https://blog.springshare.com/wp-content/uploads/2010/02/nc-md.gif" alt="No image available">
              </a>
            </div>
            <div class="col-auto">
              <span class="h4">{{props.entry.title}}</span>
            </div>
          </div>
        </div>
        <div class="col-2">
          <div class="row h-50">
            <div class="col-12 m-0 h-100 w-100">
              <button @click="openEditModal" class="btn text-dark w-100 h-100" data-bs-toggle="modal" data-bs-target="#entryEditModal">
                <i class="fa-regular fa-pen-to-square h3"></i>
              </button>
            </div>
            <div class="col-12 m-0 h-100 w-100">
              <button class="btn text-danger w-100 h-100">
                <i class="fa-solid fa-trash h3"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>

</style>