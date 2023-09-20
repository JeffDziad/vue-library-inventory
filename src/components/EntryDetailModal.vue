<script setup>
const props = defineProps(['entry', 'viewFormat']);
</script>

<template>
  <!-- Detail Modal -->
  <div class="modal fade" id="entryDetailModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="entryDetailModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="entryDetailModalLabel">{{props.entry.title}}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-auto">
              <img v-if="props.entry.imgUrl !== ''" class="img-fluid thumbnail-cover" :src="props.entry.imgUrl" :alt="props.entry.title">
              <img v-else class="thumbnail-cover" src="https://blog.springshare.com/wp-content/uploads/2010/02/nc-md.gif" alt="No image available">
            </div>
            <div class="col">
              <div class="mb-1">
                <label class="fw-bold text-decoration-underline"><i class="fa-solid fa-user"></i>&nbsp;Author</label><br>
                <span v-if="props.entry.author!==''">{{props.entry.author}}</span>
                <span v-else>UNKNOWN</span>
              </div>
              <div class="mb-1">
                <label class="fw-bold text-decoration-underline"><i class="fa-solid fa-hashtag"></i>&nbsp;ISBN</label><br>
                <span>{{props.entry.isbn}}</span>
              </div>
              <div class="mb-1">
                <label class="fw-bold text-decoration-underline"><i class="fa-solid fa-building"></i>&nbsp;Publisher</label><br>
                <span v-if="props.entry.publisher!==''">{{props.entry.publisher}}</span>
                <span v-else>UNKNOWN</span>
              </div>
              <div class="mb-1">
                <label class="fw-bold text-decoration-underline"><i class="fa-solid fa-calendar"></i>&nbsp;Publish Date</label><br>
                <span v-if="props.entry.publishDate!==''">{{props.entry.publishDate}}</span>
                <span v-else>UNKNOWN</span>
              </div>
              <div class="mb-1">
                <label class="fw-bold text-decoration-underline"><i class="fa-solid fa-check"></i>&nbsp;Status</label><br>
                <span>{{props.entry.status}}</span>
              </div>
              <div class="mb-1">
                <label class="fw-bold text-decoration-underline"><i class="fa-solid fa-location-crosshairs"></i>&nbsp;Shelve Location</label><br>
                <span v-if="props.entry.shelveLocation!==''">{{props.entry.shelveLocation}}</span>
                <span v-else>UNKNOWN</span>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <div>
                <label class="fw-bold text-decoration-underline"><i class="fa-solid fa-circle-question"></i>&nbsp;Description</label><br>
                <span v-if="props.entry.description!==''">{{props.entry.description}}</span>
                <span v-else>UNKNOWN</span>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer d-flex justify-content-between">
          <button class="btn text-dark border-0">
            <i class="fa-regular fa-pen-to-square h3"></i>
          </button>
          <button class="btn text-danger border-0">
            <i class="fa-solid fa-trash h3"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>