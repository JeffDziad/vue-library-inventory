<script setup>
import {computed, ref, watch} from "vue";
import CatergoryPill from "@/components/CatergoryPill.vue";

  const props = defineProps(['categoryList', 'entryCategories', 'newCategoryFunc']);
  const newCategory = ref("");
  const form = ref(null);
  const generatedId = Math.floor(Math.random() * 10e16);

  const categories = computed(() => {
    if(props.entryCategories && props.categoryList) {
      let obj = {};
      for(let c in props.categoryList) {
        let cat = props.categoryList[c];
        obj[cat] = (props.entryCategories.indexOf(cat) !== -1);
      }
      for(let c in props.entryCategories) {
        let cat = props.entryCategories[c];
        obj[cat] = true;
      }
      return obj;
    }
    return {};
  });
  const categoriesChecked = ref(categories);

  function pushCategory(category) {
    if(props.entryCategories.indexOf(category) === -1) {
      props.entryCategories.push(category);
    }
  }

  function pullCategory(category) {
    let id = props.entryCategories.indexOf(category);
    if(id !== -1) props.entryCategories.splice(id, 1);
  }

  function checkAndAddCategory() {
    let valid = true;
    if(newCategory.value) {
      for(let key in categories) {
        if(key.toUpperCase() === newCategory.value.toUpperCase()) {
          valid = false;
          break;
        }
      }
    } else valid = false;
    if(valid) {
      pushCategory(newCategory.value);
      newCategory.value = "";
    }
  }

  function checked(e) {
    let chk = document.getElementById(e.target.id);
    if(chk.checked) {
      pushCategory(e.target.value);
    } else {
      pullCategory(e.target.value);
    }
  }
</script>

<template>
  <div class="accordion accordion-flush border border-2 rounded rounded-2 border-primary" :id="'categoryAccordion'+generatedId">
    <div class="accordion-item">
      <div class="accordion-header">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" :data-bs-target="'#categoryAccordionContent'+generatedId" aria-expanded="false" :aria-controls="'categoryAccordionContent'+generatedId">
          <i class="me-3 fa-solid fa-layer-group fa-lg"></i>Categories
        </button>
        <div v-for="cat in entryCategories">
          <CatergoryPill :name="cat"></CatergoryPill>
        </div>
      </div>
      <div :id="'categoryAccordionContent'+generatedId" class="accordion-collapse collapse" :data-bs-parent="'#categoryAccordion'+generatedId">
        <div class="accordion-body">
          <div class="mb-3">
            <div v-for="(value, name, index) in categoriesChecked">
              <div class="category-checkbox form-check">
                <input @click="checked" v-model="categoriesChecked[name]" class="form-check-input border-primary border" type="checkbox" :value="name" :id="'category-check-'+name+generatedId">
                <label class="form-check-label" :for="'category-check-'+name+generatedId">
                  {{name}}
                </label>
              </div>
            </div>
            <div v-if="categories.length <= 0">
              <p>No categories found...</p>
            </div>
          </div>
          <div class="border-primary border-2">
            <div class="input-group">
              <input @click="" v-model="newCategory" type="text" class=" form-control" placeholder="Custom" aria-label="Custom" aria-describedby="custom-category">
              <button @click.prevent="checkAndAddCategory" class="btn btn-primary" type="button" id="custom-category">
                <i id="customCategoryIcon" class="input-btn-icon fa-solid fa-plus"></i>
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