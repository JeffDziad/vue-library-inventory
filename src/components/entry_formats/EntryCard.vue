<script setup>
const props = defineProps(['entry', 'viewFormat', 'editEntry', 'deleteEntry', 'detailEntry']);
</script>

<template>
  <div class="card">
    <div class="card-body">

      <!--   Region: Grid View   -->
      <div v-if="viewFormat==='grid'">
        <a @click="detailEntry(entry)" class="entry-detail-btn text-reset text-decoration-none" data-bs-toggle="modal" data-bs-target="#entryDetailModal">
          <img v-if="props.entry.imgUrl !== ''" class="img-fluid thumbnail-cover" :src="props.entry.imgUrl" :alt="props.entry.title">
          <img v-else class="thumbnail-cover" src="https://blog.springshare.com/wp-content/uploads/2010/02/nc-md.gif" alt="No image available" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="See Details">
        </a>
      </div>

      <!-- Region: Detail View   -->
      <div v-if="viewFormat==='detail'" class="row">
        <div class="col-sm-12 col-md-10">
          <div class="row">
            <div class="col-auto">
              <a @click="detailEntry(entry)" class="entry-detail-btn text-reset text-decoration-none" data-bs-toggle="modal" data-bs-target="#entryDetailModal">
                <img v-if="props.entry.imgUrl !== ''" class="img-fluid thumbnail-cover" :src="props.entry.imgUrl" :alt="props.entry.title">
                <img v-else class="thumbnail-cover" src="https://blog.springshare.com/wp-content/uploads/2010/02/nc-md.gif" alt="No image available">
              </a>
            </div>
            <div class="col-auto">
              <div class="mb-1 h3">
                <span>{{props.entry.title}}</span>
              </div>
              <div class="mb-1">
                <label class="fw-bold text-decoration-underline"><i class="fa-solid fa-user"></i>&nbsp;Author</label><br>
                <span v-if="props.entry.author!==''">{{props.entry.author}}</span>
                <span v-else>UNKNOWN</span>
              </div>
              <div class="mb-1">
                <label class="fw-bold text-decoration-underline"><i class="fa-solid fa-hashtag"></i>&nbsp;ISBN</label><br>
                <span>{{props.entry.isbn}}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="col-sm-12 col-md-2">
          <div class="d-none d-md-block row h-50">
            <div class="col-12 m-0 h-100 w-100">
              <button @click="editEntry(entry)" class="d-sm-none d-md-block btn text-dark w-100 h-100 dark-text-bg-hover " data-bs-toggle="modal" data-bs-target="#entryEditModal">
                <i class="fa-regular fa-pen-to-square h3"></i>
              </button>
            </div>
            <div class="col-12 m-0 h-100 w-100">
              <button @click="deleteEntry(entry)" class="d-sm-none d-md-block btn text-danger w-100 h-100 danger-text-bg-hover" data-bs-toggle="modal" data-bs-target="#entryDeleteModal">
                <i class="fa-solid fa-trash h3"></i>
              </button>
            </div>
          </div>
          <div class="d-block d-md-none row">
            <div class="col-12">
              <div class="row">
                <div class="col-6">
                  <button @click="editEntry(entry)" class="d-sm-block d-md-none btn text-dark w-100 h-100 dark-text-bg-hover " data-bs-toggle="modal" data-bs-target="#entryEditModal">
                    <i class="fa-regular fa-pen-to-square h3"></i>
                  </button>
                </div>
                <div class="col-6">
                  <button @click="deleteEntry(entry)" class="d-sm-block d-md-none btn text-danger w-100 h-100 danger-text-bg-hover" data-bs-toggle="modal" data-bs-target="#entryDeleteModal">
                    <i class="fa-solid fa-trash h3"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>

</style>