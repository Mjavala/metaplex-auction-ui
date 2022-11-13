<script setup lang="ts">
import { WalletMultiButton } from "solana-wallets-vue";
import { computed } from "vue";
import AccountCircle from "../../node_modules/vue-material-design-icons/AccountCircle.vue";

import { useRoute } from "vue-router";

const route = useRoute();

const isRoute = (path: string) => {
  if (route.name) return route.name == path;
};
</script>

<template>
  <div
    id="nav-wrap"
    class="pt-6 pb-4 w-screen h-20 flex justify-end items-center"
  >
    <div class="flex-grow flex h-full"></div>
    <nav class="nav-items">
      <router-link v-if="!isRoute('home')" to="/" class="nav-item"
        >Home</router-link
      >
      <router-link
        v-if="!isRoute('marketplace')"
        to="/"
        class="nav-item"
        >Marketplace</router-link
      >
    </nav>
    <div id="nav-button-wrap">
      <wallet-multi-button dark></wallet-multi-button>
    </div>
    <router-link v-if="!isRoute('profile')" to="/profile" class="nav-item">
      <account-circle fillColor="#E8F3F1" size="48" />
    </router-link>
  </div>
</template>

<style>
.nav-items {
  display: flex;
  padding-right: 3em;
  cursor: pointer;
}

.nav-item {
  padding: 0 2.5em;
  color: #e8f3f1 !important;
  font-size: 1em;
}

#nav-button-wrap {
  padding-right: 2em;
}

/** BUTTON CLASSES (OVERRIDES) */
.swv-button {
  color: azure;
  cursor: pointer;
  transition: all 0.1s ease;
  position: relative;
  display: inline-block;
}

.swv-button {
  color: #e8f3f1;
  border-radius: 30px;
  border: 1px solid #e8f3f1 !important;
  box-shadow: 0 0 2px #14ffec, 0 0 10px #14ffec inset;
}

.swv-button:before {
  height: 0%;
  width: 2px;
}

.swv-button:hover {
  box-shadow: inset 0 0 10px #14ffec, 0 0 20px #14ffec inset,
    0 0 20px #e8f3f1 inset;
}
</style>
