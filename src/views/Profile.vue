<script setup lang="ts">
import NavBar from "../components/NavBar.vue";
import LeftSideBar from "../components/LeftSideBar.vue";
import { ref, watchEffect } from "vue";
import Grid from "../components/Grid.vue";
import { store } from "../store";

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
    <NavBar />
    <div id="profle-app-wrap" class="flex">
      <LeftSideBar />
      <Grid />
    </div>
  </div>
</template>
