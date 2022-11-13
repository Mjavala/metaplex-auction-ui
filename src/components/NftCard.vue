<script setup lang="ts">
import { ref, PropType, watchEffect } from "vue";
import NftOperations from "./NftOperations.vue";
import { nftMetadata } from "../models";
import { store } from "../store";
import { useRoute } from "vue-router";
import { useWallet } from "solana-wallets-vue";

const ops = ref(false);

const props = defineProps({
  data: {
    type: Object as PropType<nftMetadata>,
    default: [{}],
  },
});

const listModalTrigger = () => {
  // @ts-ignore
  store.nftData = props;
};

const route = useRoute();

const isRoute = (path: string) => {
  if (route.name) return route.name == path;
};

const walletIsOwner = ref(false);

watchEffect(() => {
  if (props.data) {
    const { publicKey } = useWallet();
    if (publicKey.value) {
      if (props.data.owner == publicKey.value.toString()) {
        walletIsOwner.value = true;
      }
    }
  }
});
</script>

<template>
  <div
    class="nft-wrap flex flex-col mx-4 my-3 border border-secondary rounded-2xl shadow-lg shadow-black border-opacity-50"
  >
    <div class="nft-image-wrap">
      <img class="nft-image w-full h-full" :src="props.data.image" />
    </div>
    <div class="flex flex-col w-full flex-grow p-1 justify-evenly">
      <div class="nft-title-wrap pl-3">
        <div class="nft-title text-xs">{{ props.data.name }}</div>

        <div v-if="isRoute('profile')" class="nft-sub-title text-xs pb-1">
          {{ props.data.collection }}
        </div>
        <div v-if="isRoute('marketplace')" class="nft-sub-title text-xs pb-1">
          {{
            // @ts-ignore
            props.data.collection.name
          }}
        </div>
      </div>
      <div class="nft-ops flex w-full justify-center items-center pl-3">
        <div class="nft-cta flex flex-grow flex items-center">
          <img
            class="nft-solana-icon w-4 h-full"
            src="../assets/solana-sol-icon.png"
            alt=""
          />
          <div class="nft-price pl-3 text-xs">127</div>
        </div>
        <div
          class="nft-ops-trigger flex-grow flex justify-end pr-2 cursor-pointer"
          @click="ops = true"
        >
          <dots-horizontal fillColor="#E30546" size="30" />
        </div>
      </div>
    </div>
    <NftOperations
      v-if="ops"
      :walletIsOwner="walletIsOwner"
      :tradeStateAddress="props.data.tradeStateAddress"
      :mint="props.data.mint"
      :listing="props.data.listing"
      @exit-ops="ops = false"
      @list-nft="listModalTrigger()"
    />
  </div>
</template>

<style scoped>
.nft-wrap {
  width: 224px;
  height: 315px;
  box-shadow: rgba(0, 0, 0, 0.44) 0px 6px 16px;
  border-bottom-left-radius: 12.5px;
  border-bottom-right-radius: 12.5px;
  position: relative;
}

.nft-image-wrap {
  height: 240px;
  border-top-right-radius: 1rem;
  border-top-left-radius: 1rem;
}

.nft-image {
  border-top-right-radius: 1rem;
  border-top-left-radius: 1rem;
}

.nft-title {
  color: #e8f3f1;
}

.nft-sub-title {
  color: #e30546;
}
</style>
