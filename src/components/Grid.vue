<script setup lang="ts">
import { watchEffect, ref, onMounted } from "vue";
import { store } from "../store";
import { useRoute } from "vue-router";
import SkeletonCard from "./SkeletonCard.vue";
import NftCard from "./NftCard.vue";

const route = useRoute();

// @ts-ignore
let data = ref([]);
onMounted(async () => {
  if (route.name == "Home") {
    data.value = await store.metaplex.getAllNftsForSale();
    console.log(data.value);
  } else if (route.name == "profile" && store.connected)
    data.value = await store.metaplex.getAllWalletNfts();
});

watchEffect(async () => {
  if (store.connected && route.name == "profile") {
    data.value = await store.metaplex.getAllWalletNfts();
  }
});
/*
watchEffect(() => {
  // this shows malformed NFTs that do not adhere to standards as well.
  // these should be filtered out before this check.
  if (store.metaplex.walletNfts && route.name == "profile") {
    if (store.metaplex.walletNfts.length == 0) {
      // user has no NFTS
      // show no NFT message
    } else {
      // @ts-ignore
      data.value = store.metaplex.walletNfts;
    }
  } else if (
    store.metaplex.auctionHouseListings &&
    store.metaplex.auctionHouseListings.length > 0 &&
    route.name == "marketplace"
  ) {
    // @ts-ignore
    data.value = store.metaplex.auctionHouseListings;
  }
});
*/
</script>

<template>
  <div id="grid-wrap" class="h-screen w-full">
    <div
      id="grid-cards-wrap"
      class="flex items-start justify-start flex-wrap h-screen max-h-max bg-primary w-full"
    >
      <Suspense>
        <template v-if="data.length > 0" v-for="item in data">
          <!-- bring nft operations into this scope and conditionally render the nft card or ops based on input -->
          <NftCard :data="item" />
        </template>
        <template v-else v-for="index in 20">
          <SkeletonCard />
        </template>
      </Suspense>
    </div>
  </div>
</template>

<style scoped>
#grid-wrap {
  z-index: 10;
}

.nft {
  z-index: 10;
}

#grid-cards-wrap {
  overflow-y: scroll;
  padding: 3em;
  border-radius: 20px;
}
</style>
