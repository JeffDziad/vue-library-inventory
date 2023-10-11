<script setup>
import EntryEditModal from "@/components/EntryEditModal.vue";
import EntryDeleteModal from "@/components/EntryDeleteModal.vue";
import EntryDetailModal from "@/components/EntryDetailModal.vue";

const props = defineProps(['entry', 'viewFormat', 'categoryList', 'deleteEntry', 'updateEntry']);
</script>

<template>
  <div class="card">
    <div class="card-body">

      <!--   Region: Grid View   -->
<!--      <div v-if="viewFormat==='grid'">-->
<!--        <a class="entry-detail-btn text-reset text-decoration-none" data-bs-toggle="modal" :data-bs-target="'#'+'entryDetailModal-'+entry.isbn">-->
<!--          <img v-if="props.entry.imgUrl !== ''" class="img-fluid thumbnail-cover" :src="props.entry.imgUrl" :alt="props.entry.title">-->
<!--          <img v-else class="thumbnail-cover" src="https://blog.springshare.com/wp-content/uploads/2010/02/nc-md.gif" alt="No image available" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="See Details">-->
<!--        </a>-->
<!--      </div>-->

      <!-- Region: Detail View   -->
      <div class="row">
        <div class="col-sm-12" :class="{'col-md-10':(viewFormat==='detail')}">
          <div class="row">
            <div class="col-auto">
              <entry-detail-modal :id="'entryDetailModal-'+entry.isbn" :entry="entry" >
                <img v-if="props.entry.imgUrl !== ''" class="img-fluid thumbnail-cover" :src="props.entry.imgUrl" :alt="props.entry.title">
                <img v-else class="thumbnail-cover" src="https://blog.springshare.com/wp-content/uploads/2010/02/nc-md.gif" alt="No image available">
              </entry-detail-modal>
            </div>



            <div v-if="viewFormat==='detail'" class="col-auto">
              <div class="mb-1 h3">
                <span>{{props.entry.title}}</span>
              </div>
              <div v-if="props.entry.author!=='' && viewFormat==='detail'" class="mb-1">
                <label class="fw-bold detail-field-label"><i class="fa-solid fa-user me-2"></i>Author</label><br>
                <div class="ps-3">
                  <span>{{props.entry.author}}</span>
                </div>
              </div>
              <div v-if="viewFormat==='detail'" class="mb-3">
                <label class="fw-bold detail-field-label"><i class="fa-solid fa-hashtag  me-2"></i>ISBN</label><br>
                <div class="ps-3">
                  <span>{{props.entry.isbn}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="viewFormat==='detail'" class="col-sm-12 col-md-2">
          <div class="row h-50">
            <div class="col-12 m-0 h-100 w-100">
              <entry-edit-modal :update-entry="updateEntry" :id="'entryEditModal-'+entry.isbn" :entry="entry" :category-list="categoryList"></entry-edit-modal>
            </div>
            <div class="col-12 m-0 h-100 w-100">
              <entry-delete-modal :delete-self="deleteEntry" :id="'entryDeleteModal-'+entry.isbn" :title="entry.title" :isbn="entry.isbn"></entry-delete-modal>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>

</style>