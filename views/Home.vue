<script setup lang="ts">
import NavBar from "../components/NavBar.vue";
</script>

<template>
  <div class="h-max w-max">
    <div
      id="home-wrap"
      class="w-screen h-screen flex flex-col justify-center items-start fade-in"
    >
      <NavBar />
      <div class="w-full h-full flex justify-center items-center">
        <!--
        <h1 class="title">Welcome</h1>
        -->
      </div>
    </div>
  </div>
</template>

<style>
#home-wrap {
  background: linear-gradient(
      rgba(35, 43, 43, 0.3) 100%,
      rgba(35, 43, 43, 0.3) 100%
    ),
    url("../assets/forest-bg.png");
  background-size: cover;
  background-repeat: no-repeat;
  width: 100vw;
}

.fade-in {
  animation: fadeIn ease 1s;
  -webkit-animation: fadeIn ease 1s;
  -moz-animation: fadeIn ease 1s;
  -o-animation: fadeIn ease 1s;
  -ms-animation: fadeIn ease 1s;
}
@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@-moz-keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@-webkit-keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@-o-keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@-ms-keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
