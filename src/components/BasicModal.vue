<script setup>
const props = defineProps({
  title: {
    type: String,
    default: "Default Title",
  },
  id: {
    type: String,
    default: `basicModal-${Math.floor(Math.random()*10e16)}`,
  },
  icon: {
    type: String,
    default: undefined,
  }
});
</script>

<template>
  <div class="modal fade" :id="id" tabindex="-1" role="dialog" :aria-labelledby="id + '-modalTitle'" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="document">
        <div class="modal-content">
          <div class="modal-header bg-primary">
            <slot name="header">
              <h5 class="modal-title fs-5 text-light" :id="id + '-modalTitle'"><i v-if="icon" :class="icon"></i>&nbsp;{{title}}</h5>
              <button type="button" class="btn-close bg-light" data-bs-dismiss="modal" aria-label="Close"></button>
            </slot>
          </div>
          <div class="modal-body">
            <slot></slot>
          </div>
          <div class="modal-footer d-flex justify-content-between">
            <slot name="footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">OK</button>
            </slot>
          </div>
        </div>
    </div>
  </div>
</template>

<style scoped>

</style>