<script setup lang="ts">
import { walletConnected, solanaConnected } from "../utils";

walletConnected();
solanaConnected();
</script>

<template>
  <router-view v-slot="{ Component, route }">
    <transition name="fade">
      <component :is="Component" :key="route.path" />
    </transition>
  </router-view>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Orbitron&display=swap");

/**
  color - default for app
  background-color - allows for transitions to not have a white background
*/
#app {
  font-family: "Orbitron", sans-serif !important;
  color: #e8f3f1;
  background-color: #0C1622;
}

/** transition styles */

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
