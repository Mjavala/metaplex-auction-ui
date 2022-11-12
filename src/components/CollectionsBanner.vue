<script setup lang="ts"></script>

<template>
  <div
    id="collections-banner-wrap"
    class="w-screen h-xs flex justify-center items-center text-primary"
  >
    <div
      class="flex flex-row-reverse justify-evenly items-center flex-grow h-full p-2"
    >
      <div class="collection-image pb-2 rounded-1/2">
        <img
          id="collection-img"
          src="../assets/collection-image.png"
          alt="collection-image"
          data-aos="fade-in"
          data-aos-easing="ease-in-out"
        />
      </div>
      <div class="collection-info-wrap flex flex-col text-3xl">
        <div class="text-3xl" data-aos="slide-right">Collection Name</div>
        <div
          class="collection-socials-wrap h-8 flex justify-evenly items-center pt-4"
        >
          <img
            src="../assets/discord.png"
            class="social-icon-wrap h-full rounded-1/2"
          />
          <img
            src="../assets/twitter.png"
            class="social-icon-wrap h-full rounded-1/2"
          />
          <img
            src="../assets/youtube.png"
            class="social-icon-wrap h-full rounded-1/2"
          />
          <img
            src="../assets/instagram.png"
            class="social-icon-wrap h-full rounded-1/2"
          />
        </div>
      </div>
    </div>
    <!--
    <div
      class="vertical-spacer h-2/3 w-px flex justify-center items-center border-r border-primary"
    ></div>
    -->
    <div
      class="collection-description flex justify-center items-center flex-grow h-full p-8 max-w-1/2"
      data-aos="slide-left"
    >
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eum minima
      voluptatibus officia. Rerum vitae architecto sint et. Iusto, repellendus?
      A explicabo veritatis quis officia nobis minima hic quia assumenda ut.
    </div>
  </div>
</template>

<style scoped>
#collections-banner-wrap {
  background: url("../assets/collection-background.png");
  background-repeat: no-repeat;
  background-size: cover;
}
#collection-img {
  width: 100%;
  height: 100%;
}
.social-icon-wrap {
  width: 28px;
  height: 28px;
}
</style>
