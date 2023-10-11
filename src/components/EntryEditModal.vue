<script setup>
  import EntryForm from './forms/EntryForm.vue';
  import GoogleBooksLookupForm from "@/components/forms/GoogleBooksLookupForm.vue";
  import BasicModal from "@/components/BasicModal.vue";
  import {onMounted, ref} from "vue";

  const props = defineProps(['id', 'entry', 'categoryList', 'updateEntry']);
  const emits = defineEmits(['updateEntry']);
  const entryCopy = ref({});

  const basicModal = ref(null);
  const bsModal = ref(null);

  function submitEntry() {
    //! Cant get Object.assign to work
    //! Had to create updateEntry prop and pass the save function from App.vue in
    // let n = JSON.parse(JSON.stringify({...entryCopy.value}));
    // console.log(n);
    // Object.assign(props.entry, n);

    // for (const [key, value] of Object.entries(props.entry)) {
    //   console.log(key);
    //   props.entry[key] = entryCopy.value[key];
    // }

    // Object.keys(entryCopy.value).forEach(function(key) {
    //   if (key in props.entry) { // or obj1.hasOwnProperty(key)
    //     props.entry[key] = entryCopy.value[key];
    //   }
    // });

    props.updateEntry(entryCopy.value);
    bsModal.value.hide();
  }

  onMounted(() => {
    entryCopy.value = JSON.parse(JSON.stringify({...props.entry}));

    bsModal.value = new bootstrap.Modal(document.getElementById(props.id));

    document.getElementById(props.id).addEventListener('hidden.bs.modal', () => {
      entryCopy.value = JSON.parse(JSON.stringify({...props.entry}));
    });
  });
</script>

<template>
  <button class="d-none d-md-block btn text-dark w-100 h-100 dark-text-bg-hover " data-bs-toggle="modal" :data-bs-target="'#'+id">
    <i class="fa-regular fa-pen-to-square h3"></i>
  </button>

  <BasicModal ref="basicModal" :id="id" title="Edit Entry" icon="fa-regular fa-pen-to-square">
    <EntryForm :id="'entryEditForm-'+entry.isbn" :is-edit="true" :entry="entryCopy" :category-list="categoryList" :submit-entry="submitEntry"></EntryForm>
    <template #footer>
      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
      <button type="submit" :form="'entryEditForm-'+entry.isbn+'-entryForm'" class="btn btn-primary">Save</button>
    </template>
  </BasicModal>


</template>

<style scoped>

</style>