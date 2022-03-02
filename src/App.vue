<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
body {
  margin: 0;
  font-family: Arial;
  height: 100vh;
}
#app {
  height: 100%;
  min-width: 1400px;
}
</style>
