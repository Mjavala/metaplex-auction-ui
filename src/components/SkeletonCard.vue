<template>
  <div
    class="nft-wrap flex flex-col mx-4 my-3 border border-secondary rounded-2xl shadow-lg shadow-black border-opacity-25"
  >
    <div class="nft-image-wrap bg-secondary shine">
      <img class="nft-image w-full" />
    </div>
    <div class="flex flex-col w-full flex-grow p-1 justify-evenly">
      <div class="nft-title-wrap pl-3">
        <div class="nft-title h-4 bg-secondary w-2/3 pt-2 shine"></div>

        <div
          class="nft-sub-title text-xs pb-1 h-2 bg-secondary w-1/3 my-1 shine"
        ></div>
      </div>
      <div class="nft-ops flex w-full justify-center items-center pl-3">
        <div class="nft-cta flex flex-grow flex items-center">
          <div class="nft-solana-icon shine w-5 h-5 bg-secondary"></div>
          <div
            class="nft-price shine pl-3 text-md font-medium w-12 h-4 bg-secondary mx-2"
          ></div>
        </div>
        <div
          class="nft-ops-trigger shine flex-grow flex justify-end mr-2 cursor-pointer bg-secondary w-8 h-4"
        ></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.nft-wrap {
  width: 224px;
  height: 315px;
}

.nft-image-wrap {
  height: 240px;
  border-top-right-radius: 1rem;
  border-top-left-radius: 1rem;
}

.shine {
  background-image: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0),
    rgba(43, 74, 111, 1),
    rgba(255, 255, 255, 0)
  );
  background-size: 40px 100%;
  background-repeat: no-repeat;
  background-position: left -40px top 0;
  animation: shine 2s ease-in-out 0s infinite reverse;
  -webkit-animation: shine 2s ease-in-out 0s infinite reverse;
}

@keyframes shine {
  0% {
    opacity: 0.5;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.5;
  }
}

@-webkit-keyframes shine {
  0% {
    opacity: 0.5;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.5;
  }
}

.nft-title {
  color: #e8f3f1;
}

.nft-sub-title {
  color: #0d7377;
}
</style>
