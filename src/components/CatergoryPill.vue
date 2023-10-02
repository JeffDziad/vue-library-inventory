<script setup>
  const props = defineProps(['name'])
</script>

<template>
  <div class="bg-primary text-white fw-bolder p-2">
    <i class="mx-3 fa-solid fa-arrow-turn-up fa-rotate-90 fa-lg"></i>&nbsp;{{name}}
  </div>
</template>

<style scoped>

</style>