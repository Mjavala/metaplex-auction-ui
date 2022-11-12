<script></script>

<template>
  <div
    id="grid-command"
    class="flex justify-center items-center h-20 w-full border-b border-primary px-8"
  >
    <div class="flex px-4 justify-center items-center">
      <refresh
        id="refresh-icon"
        class="flex justify-center text-primary cursor-pointer px-4"
      />
      <div class="text-xs px-4">refreshed 10 seconds ago</div>
    </div>
    <div class="flex flex-grow justify-center items-center">
      Loading Collection...
    </div>
    <input
      type="text"
      placeholder="Search Collection"
      class="w-1/3 bg-secondary rounded-xl border-none shadow shadow-gray-500"
    />
  </div>
</template>
