<script setup lang="ts">
import NavBar from "../components/NavBar.vue";

</script>

<template>
    <div class="flex flex-col bg-primary w-min-screen min-h-screen">
        <NavBar />
        <!-- beginning of nft view -->
        <div id="nft-view" class="w-full flex flex-grow">
            <div id="nft-left" class="flex flex-col flex-grow">
                <div class="nft-item h-full my-18 ml-28 mr-4 border">

                </div>
            </div>
            <div id="nft-right" class=" flex flex-col flex-grow">
                <div class="nft-item h-full my-18 mr-28 ml-4 border">

                </div>
            </div>
        </div>
    </div>
</template>
