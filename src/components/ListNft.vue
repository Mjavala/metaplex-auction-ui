<script setup lang="ts">
import { ref } from "vue";
import { store } from "../store";

const price = ref(0);
const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

console.log(props);
const truncate = (str: string, max = 6) => {
  return str.length > max
    ? str.substr(0, max - 1) + "…" + str.substring(str.length - 3)
    : str;
};

const listNft = () => {
  // TODO refactor
  const data = props.data.data;

  store.metaplex.listNft(data.mint, price);
};
</script>

<template>
  <div id="nft-buy-wrap">
    <div
      class="nft-buy-inner h-max w-full p-4 flex justify-center align-center flex-col"
    >
      <div id="nft-buy-info-wrap" class="w-full h-24">
        <div id="nft-buy-info" class="flex items-center h-max">
          <div class="nft-icon-wrap h-full pl-4 mt-4"></div>
          <div>
            <div class="nft-name pl-3">
              {{ truncate(props.data.data.mint) }}
            </div>
            <div class="nft-collection pl-3 text-xs">
              {{ props.data.data.collection }}
            </div>
          </div>
        </div>
      </div>
      <div class="search-bar-wrap w-full flex justify-between items-center">
        <input
          class="search-bar w-full"
          type="number"
          placeholder="price"
          v-model="price"
        />
      </div>
    </div>
    <button class="swv-button mt-4 flex w-50 justify-center" @click="listNft()">
      List {{ truncate(props.data.data.mint) }}
    </button>
    <div id="listing-info" class="w-full text-xs pt-4 pl-4">
      Listing price: {{ price }} SOL
    </div>
  </div>
</template>

<style scoped>
.nft-buy-inner {
  border-bottom: 1px solid #323232;
}

.search-bar {
  background-color: #323232;
  border: none;
  border-radius: 25px;
}

.nft-icon-wrap {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background-color: #e8f3f1;
}

#listing-info,
.nft-collection {
  color: #14ffec;
}
</style>
