<script setup>
import CatergoryPill from "@/components/CatergoryPill.vue";
import {computed, ref} from "vue";
import BasicModal from "@/components/BasicModal.vue";

//! viewFormat not being used
const props = defineProps(['id', 'entry']);
const readMore = ref(false);

function formattedPublishDate() {
  if(props.entry) {
    let timestamp = Date.parse(props.entry.publishDate);
    let date = new Date(timestamp);
    let dateArr = date.toDateString().split(' ');
    dateArr.splice(0, 1);
    dateArr.splice(2, 0, ', ');
    dateArr.splice(1, 0, ' ');
    return dateArr.join('');
  }
}

function toggleDescription() {
  readMore.value = !readMore.value;
  console.log(readMore.value);
}

const formattedDescription = computed(() => {
  if(props.entry.description) {
    if (readMore.value) {
      return props.entry.description;
    } else {
      return `${props.entry.description.slice(0, 300)}...`;
    }
  }
});
</script>

<template>
  <a class="entry-detail-btn text-reset text-decoration-none" data-bs-toggle="modal" :data-bs-target="'#'+id">
    <slot></slot>
  </a>

  <BasicModal :id="id" :title="entry.title" icon="fa-solid fa-book">
    <div class="row mb-3">
      <div class="col-12">
        <div class="mb-1">
          <label class="fw-bold detail-field-label me-2"><i class="fa-solid fa-check me-2"></i>Status</label>
          <span class="text-white p-1 rounded" :class="{
                    'status-on-shelve': entry.status==='On Shelve',
                    'status-checked-out': entry.status==='Checked Out',
                    'status-discontinued': entry.status==='Discontinued'
                  }">
                    {{props.entry.status}}
                    <span>
                      <i v-if="entry.status==='On Shelve'" class="fa-solid fa-check"></i>
                      <i v-else-if="entry.status==='Checked Out'" class="fa-solid fa-minus"></i>
                      <i v-else class="fa-solid fa-xmark"></i>
                    </span>
                  </span>
          <div class="ps-3">

          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-auto">
        <img v-if="props.entry.imgUrl !== ''" class="img-fluid detail-cover" :src="props.entry.imgUrl" :alt="props.entry.title">
        <img v-else class="detail-cover" src="https://blog.springshare.com/wp-content/uploads/2010/02/nc-md.gif" alt="No image available">
      </div>
      <div class="col mt-3">
        <div v-if="props.entry.author!==''" class="mb-1">
          <label class="fw-bold detail-field-label"><i class="fa-solid fa-user me-2"></i>Author</label><br>
          <div class="ps-3">
            <span>{{props.entry.author}}</span>
          </div>
        </div>
        <div class="mb-3">
          <label class="fw-bold detail-field-label"><i class="fa-solid fa-hashtag  me-2"></i>ISBN</label><br>
          <div class="ps-3">
            <span>{{props.entry.isbn}}</span>
          </div>
        </div>
        <div v-if="props.entry.publisher!==''" class="mb-3">
          <label class="fw-bold detail-field-label"><i class="fa-solid fa-building  me-2"></i>Publisher</label><br>
          <div class="ps-3">
            <span>{{props.entry.publisher}}</span>
          </div>
        </div>
        <div v-if="props.entry.publishDate!==''" class="mb-3">
          <label class="fw-bold detail-field-label"><i class="fa-solid fa-calendar  me-2"></i>Publish Date</label><br>
          <div class="ps-3">
            <span>{{formattedPublishDate()}}</span>
          </div>
        </div>
        <div v-if="props.entry.shelveLocation!==''"  class="mb-3">
          <label class="fw-bold detail-field-label"><i class="fa-solid fa-location-crosshairs me-2"></i>Shelve Location</label><br>
          <div class="ps-3">
            <span>{{props.entry.shelveLocation}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="row mt-0 mt-sm-3">
      <div class="col-12">
        <div v-if="props.entry.description!==''">
          <label class="fw-bold detail-field-label"><i class="fa-solid fa-circle-question  me-2"></i>Description</label><br>
          <div class="ps-3">
            {{ formattedDescription }}
            <a class="link-primary" style="cursor: pointer;" @click="toggleDescription">
              Read {{ readMore ? "Less" : "More" }}
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="row mt-3">
      <div class="col-12">
        <div class="card">
          <div class="card-header bg-primary text-white"><i class="me-3 fa-solid fa-layer-group fa-lg"></i>Categories</div>
          <div class="card-body p-0 m-0">
            <div v-for="cat in entry.categories">
              <CatergoryPill :name="cat"></CatergoryPill>
            </div>
          </div>
        </div>
      </div>
    </div>
    <template #footer>
      <div class="w-100 h-100 d-flex justify-content-between">
        <button class="btn text-dark w-50 h-100 dark-text-bg-hover" data-bs-toggle="modal" :data-bs-target="'#'+'entryEditModal-'+entry.isbn">
          <i class="fa-regular fa-pen-to-square h3"></i>
        </button>
        <button class="btn text-danger w-50 h-100 danger-text-bg-hover" data-bs-toggle="modal" :data-bs-target="'#'+'entryDeleteModal-'+entry.isbn">
          <i class="fa-solid fa-trash h3"></i>
        </button>
      </div>
    </template>
  </BasicModal>

<!--  <div class="modal modal-lg fade" id="entryDetailModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="entryDetailModalLabel" aria-hidden="true">-->
<!--    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">-->
<!--      <div class="modal-content">-->
<!--        <div class="modal-header bg-primary">-->
<!--          <h5 class="modal-title text-light fw-bold" id="entryDetailModalLabel">{{props.entry.title}}</h5>-->
<!--          <button type="button" class="btn-close bg-light" data-bs-dismiss="modal" aria-label="Close"></button>-->
<!--        </div>-->
<!--        <div class="modal-body">-->
<!--          <div class="row mb-3">-->
<!--            <div class="col-12">-->
<!--              <div class="mb-1">-->
<!--                <label class="fw-bold detail-field-label me-2"><i class="fa-solid fa-check me-2"></i>Status</label>-->
<!--                <span class="text-white p-1 rounded" :class="{-->
<!--                    'status-on-shelve': entry.status==='On Shelve',-->
<!--                    'status-checked-out': entry.status==='Checked Out',-->
<!--                    'status-discontinued': entry.status==='Discontinued'-->
<!--                  }">-->
<!--                    {{props.entry.status}}-->
<!--                    <span>-->
<!--                      <i v-if="entry.status==='On Shelve'" class="fa-solid fa-check"></i>-->
<!--                      <i v-else-if="entry.status==='Checked Out'" class="fa-solid fa-minus"></i>-->
<!--                      <i v-else class="fa-solid fa-xmark"></i>-->
<!--                    </span>-->
<!--                  </span>-->
<!--                <div class="ps-3">-->

<!--                </div>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
<!--          <div class="row">-->
<!--            <div class="col-auto">-->
<!--              <img v-if="props.entry.imgUrl !== ''" class="img-fluid detail-cover" :src="props.entry.imgUrl" :alt="props.entry.title">-->
<!--              <img v-else class="detail-cover" src="https://blog.springshare.com/wp-content/uploads/2010/02/nc-md.gif" alt="No image available">-->
<!--            </div>-->
<!--            <div class="col mt-3">-->
<!--              <div v-if="props.entry.author!==''" class="mb-1">-->
<!--                <label class="fw-bold detail-field-label"><i class="fa-solid fa-user me-2"></i>Author</label><br>-->
<!--                <div class="ps-3">-->
<!--                  <span>{{props.entry.author}}</span>-->
<!--                </div>-->
<!--              </div>-->
<!--              <div class="mb-3">-->
<!--                <label class="fw-bold detail-field-label"><i class="fa-solid fa-hashtag  me-2"></i>ISBN</label><br>-->
<!--                <div class="ps-3">-->
<!--                  <span>{{props.entry.isbn}}</span>-->
<!--                </div>-->
<!--              </div>-->
<!--              <div v-if="props.entry.publisher!==''" class="mb-3">-->
<!--                <label class="fw-bold detail-field-label"><i class="fa-solid fa-building  me-2"></i>Publisher</label><br>-->
<!--                <div class="ps-3">-->
<!--                  <span>{{props.entry.publisher}}</span>-->
<!--                </div>-->
<!--              </div>-->
<!--              <div v-if="props.entry.publishDate!==''" class="mb-3">-->
<!--                <label class="fw-bold detail-field-label"><i class="fa-solid fa-calendar  me-2"></i>Publish Date</label><br>-->
<!--                <div class="ps-3">-->
<!--                  <span>{{formattedPublishDate()}}</span>-->
<!--                </div>-->
<!--              </div>-->
<!--              <div v-if="props.entry.shelveLocation!==''"  class="mb-3">-->
<!--                <label class="fw-bold detail-field-label"><i class="fa-solid fa-location-crosshairs me-2"></i>Shelve Location</label><br>-->
<!--                <div class="ps-3">-->
<!--                  <span>{{props.entry.shelveLocation}}</span>-->
<!--                </div>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
<!--          <div class="row mt-0 mt-sm-3">-->
<!--            <div class="col-12">-->
<!--              <div v-if="props.entry.description!==''">-->
<!--                <label class="fw-bold detail-field-label"><i class="fa-solid fa-circle-question  me-2"></i>Description</label><br>-->
<!--                <div class="ps-3">-->
<!--                  {{ formattedDescription }}-->
<!--                  <a class="link-primary" style="cursor: pointer;" @click="toggleDescription">-->
<!--                    Read {{ readMore ? "Less" : "More" }}-->
<!--                  </a>-->
<!--                </div>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
<!--          <div class="row mt-3">-->
<!--            <div class="col-12">-->
<!--              <div class="card">-->
<!--                <div class="card-header bg-primary text-white"><i class="me-3 fa-solid fa-layer-group fa-lg"></i>Categories</div>-->
<!--                <div class="card-body p-0 m-0">-->
<!--                  <div v-for="cat in entry.categories">-->
<!--                    <CatergoryPill :name="cat"></CatergoryPill>-->
<!--                  </div>-->
<!--                </div>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--        <div class="modal-footer">-->
<!--          <div class="w-100 h-100 d-flex justify-content-between">-->
<!--            <button @click="editEntry(entry)" class="btn text-dark w-50 h-100 dark-text-bg-hover" data-bs-toggle="modal" data-bs-target="#entryEditModal">-->
<!--              <i class="fa-regular fa-pen-to-square h3"></i>-->
<!--            </button>-->
<!--            <button @click="deleteEntry(entry)" class="btn text-danger w-50 h-100 danger-text-bg-hover" data-bs-toggle="modal" data-bs-target="#entryDeleteModal">-->
<!--              <i class="fa-solid fa-trash h3"></i>-->
<!--            </button>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
</template>

<style scoped>

</style>