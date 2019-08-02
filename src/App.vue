<template>
  <div id="app">
    <img
      src="./assets/img/socomore.png"
      alt="..."
      class="ml-4 col-2 rounded float-left mb-1"
      @click="$router.push({name: 'TabPersonnal'})"
    />
    <router-view />
  </div>
</template>