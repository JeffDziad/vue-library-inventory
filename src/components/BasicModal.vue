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
});
</script>

<template>
  <div class="modal fade" :id="id" tabindex="-1" role="dialog" :aria-labelledby="id + '-modalTitle'" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <form>
        <div class="modal-content">
          <div class="modal-header">
            <slot name="header">
              <h5 class="modal-title" :id="id + '-modalTitle'">{{title}}</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </slot>
          </div>
          <div class="modal-body">
            <slot></slot>
          </div>
          <div class="modal-footer">
            <slot name="footer">
              <!--THIS IS DEFAULT IF NON IS PASSED-->
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">OK</button>
            </slot>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>

</style>