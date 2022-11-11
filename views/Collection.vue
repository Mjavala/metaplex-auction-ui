<script setup lang="ts">
import NavBar from "../components/NavBar.vue";
import CollectionsBanner from "../components/CollectionsBanner.vue";
import Collections from "../components/Collections.vue";
</script>

<template>
  <div id="market-layout-wrap" class="flex flex-col bg-primary">
    <NavBar />
    <CollectionsBanner />
    <Collections />
  </div>
</template>
