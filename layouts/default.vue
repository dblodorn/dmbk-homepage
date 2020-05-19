<template>
  <div>
    <Header />
    <main class="pad-single">
      <nuxt />
    </main>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Header from '@/components/header'

export default {
  components: {
    Header
  },
  created () {
    this.fetchCoreData()
  },
  methods: {
    ...mapActions({
      fetchCoreData: 'api/fetchCoreData'
    })
  }
}
</script>
