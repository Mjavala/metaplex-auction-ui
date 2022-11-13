<script setup lang="ts">
import { useRoute } from "vue-router";
import { useWallet } from "solana-wallets-vue";
import { store } from "../store";
import { PublicKey } from "@solana/web3.js";
import { isConnected } from "../utils";

const route = useRoute();

const isRoute = (path: string) => {
  if (route.name) return route.name == path;
};

const props = defineProps({
  walletIsOwner: {
    type: Boolean,
    default: false,
  },
  mint: {
    type: String,
    default: null,
  },
  tradeState: {
    type: PublicKey,
    default: null,
  },
  listing: {
    // @ts-ignore
    type: null,
    default: null,
  },
});

const cancelListing = async () => {
  if (isConnected()) {
    await store.metaplex.cancelListing(props.listing);
  }
};

const buy = async () => {
  if (isConnected()) {
    await store.metaplex.buy(new PublicKey(props.mint), props.listing);
  }
};
</script>

<template>
  <div
    class="nft-ops-wrap flex flex-col justify-evenly items-center text-sm bg-primary rounded-2xl shadow-lg shadow-black border-opacity-50"
  >
    <div class="nft-ops-list">
      <div v-if="isRoute('Home')" class="nft-ops-item">
        <div v-if="!props.walletIsOwner" @click="buy()">Buy</div>
      </div>
      <div
        v-if="isRoute('profile')"
        class="nft-ops-item"
        @click="$emit('list-nft')"
      >
        List
      </div>
      <div class="nft-ops-item">View</div>
      <div
        v-if="props.walletIsOwner"
        class="nft-ops-item"
        @click="cancelListing()"
      >
        Cancel
      </div>
      <!--
        <div class="nft-ops-item">Copy Link</div>
        <div class="nft-ops-item">Refresh Metadata</div>
      -->
    </div>
    <div class="nft-ops">
      <div class="nft-ops-out-trigger">
        <location-exit
          fillColor="#0bf4f3"
          size="30"
          @click="$emit('exit-ops')"
        />
      </div>
    </div>
  </div>
</template>

<style>
.nft-ops-wrap {
  width: 224px;
  height: 315px;
  border-radius: 12.5px;
  z-index: 1000;
  position: absolute;
  top: 0%;
  left: 0%;
  box-shadow: rgba(0, 0, 0, 0.44) 0px 20px 30px -10px;
}

.nft-ops-list {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;
  flex-grow: 0.75;
  color: #0bf4f3;
}

.nft-ops {
  width: 100%;
}

.nft-ops-out-trigger span {
  cursor: pointer;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 1.5em;
  margin-bottom: 0.2em;
}
.nft-ops-item {
  cursor: pointer;
}
</style>
