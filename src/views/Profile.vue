<script setup lang="ts">
import NavBar from "../components/NavBar.vue";
import LeftSideBar from "../components/LeftSideBar.vue";
import Loader from "../components/Loader.vue";
import { ref, watchEffect } from "vue";
import Grid from "../components/Grid.vue";
import { store } from "../store";

const loaded = ref(false);

setTimeout(() => {
  loaded.value = true;
}, 1500);

// DB will hook in here
watchEffect(async () => {
  if (
    store.metaplex.auctionHouse &&
    store.metaplex.app?.identity().publicKey.toString() !=
      "11111111111111111111111111111111"
  )
    store.metaplex.getAllWalletNfts();
});
</script>

<template>
  <div id="profile-layout-wrap" class="flex flex-col bg-primary">
    <Loader v-if="!loaded" />
    <NavBar v-if="loaded" />
    <div id="profle-app-wrap" class="flex">
      <LeftSideBar v-if="loaded" />
      <Grid />
    </div>
  </div>
</template>
