<template>
  <div class="error pad-single">
    <n-link v-if="error.statusCode === 404" class="h1 back-button white" :to="'/'">
      <span>404 PAGE NOT FOUNT | RETURN Home</span>
    </n-link>
    <h1 v-else>
      An error occurred
    </h1>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      default: () => {},
      type: Object
    }
  }
}
</script>

<style scoped>
.error {
  width: 100%;
  position: relative;
}
.error > .h1 {
  position: relative;
  z-index: 100;
}
.inner {
  width: 100vw;
  height: 100vh;
  position: fixed;
  overflow: hidden;
  top: 0;
  left: 0;
  z-index: 0;
}
</style>