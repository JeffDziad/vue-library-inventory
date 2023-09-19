<script setup>
const props = defineProps(['entry']);
</script>

<template>
  <div class="card">
    <div class="card-body">
      <div class="row">
        <div class="col-3">
          <img v-if="props.entry.imgUrl !== ''" class="img-fluid" style="max-width: 200px;" :src="props.entry.imgUrl" :alt="props.entry.title">
          <img v-else src="https://blog.springshare.com/wp-content/uploads/2010/02/nc-md.gif" alt="No image available">
        </div>
        <div class="col-8">
          <span class="h4">{{props.entry.title}}</span>
        </div>
        <div class="col-1">
          <div class="row">
            <div class="col-12 m-0">
              <button class="btn text-dark w-100 h-100">
                <i class="fa-regular fa-pen-to-square h3"></i>
              </button>
            </div>
            <div class="col-12 m-0">
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