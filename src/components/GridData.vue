<script setup lang="ts">
//@ts-ignore
import LazyList from "lazy-load-list/vue";
import NftCard from "./NftCard.vue";
const props = defineProps({
  data: {
    type: Array,
    default: [
      {
        hello: "World",
      },
    ],
  },
});
</script>

<template>
  <div id="marketplace-data-wrapper">
    <LazyList containerClasses="grid-container" :data="props.data">
      <template class="flex" v-slot="{ item }">
        <NftCard :data="item" />
      </template>
    </LazyList>
  </div>
</template>

<style>
.grid-container {
  display: flex;
  width: 100%;
  justify-content: space-evenly;
}

#container {
  display: flex;
}
</style>
