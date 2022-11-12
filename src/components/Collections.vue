<script setup>
import GridCommand from "./GridCommand.vue";
import LeftSideBar from "./LeftSideBar.vue";
import Grid from "./Grid.vue";
import { store } from "../store";
</script>

<template>
  <div id="collections-wrap">
    <GridCommand />
    <div class="flex">
      <LeftSideBar />
      <Grid />
    </div>
  </div>
</template>
