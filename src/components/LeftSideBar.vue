<script setup lang="ts">
import { PublicKey } from "@solana/web3.js";
import { Ref, ref, watchEffect } from "vue";
import ListNft from "./ListNft.vue";
import { store } from "../store";
import { nftMetadata } from "../models";

const listTrigger = ref(false);

watchEffect(() => {
  // @ts-ignore
  if (store.nftData.name !== "") {
    setTimeout(() => (listTrigger.value = true), 500);
  }
});
</script>

<template>
  <div
    id="marketplace-sidebar-wrap"
    class="min-h-screen max-h-max border-r border-primary"
  >
    <div class="w-80 h-full p-4 flex flex-col">
      <ListNft :data="{ data }" v-if="listTrigger" />
    </div>
  </div>
</template>

<style></style>
