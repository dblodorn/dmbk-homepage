<template>
  <div>
    <Header />
    <main>
      <nuxt />
    </main>
    <Footer />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Header from '@/components/header'
import Footer from '@/components/footer'

export default {
  components: {
    Header,
    Footer
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
