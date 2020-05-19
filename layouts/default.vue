<template>
  <div>
    <Header />
    <main class="pad-single">
      <nuxt />
    </main>
  </div>
</template>

<script>
import Header from '@/components/header'

export default {
  components: {
    Header
  }
}
</script>
