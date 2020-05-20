<template>
  <p v-if="loading">Fetching Data...</p>
  <ul v-else>
    <li v-for="post of data.derpy_nav" :key="post.id">
      <n-link class="h1 stroke-type-bw" :to="`/work/${post.slug}`">
        {{ post.title }}
      </n-link>
    </li>
  </ul>
</template>

<script>
import { mapState } from 'vuex'

export default {
  async fetch () {
    if (!this.dataLoaded) {
      this.data = await this.$http.$get('https://dmbk.io/wp-json/dmbk-io-api/v1/derpyvision')
    } else {
      this.data = this.derpy
    }
  },
  data () {
    return {
      data: {}
    }
  },
  computed: {
    ...mapState({
      derpy: state => state.api.derpy,
      dataLoaded: state => state.api.dataLoaded
    }),
    loading () {
      if (!this.dataLoaded) {
        return this.$fetchState.pending
      } else {
        return false
      }
    }
  },
  head () {
    return {
      title: 'HELLO',
      meta: [
        { hid: 'description', name: 'description', content: 'My custom description' }
      ]
    }
  }
}
</script>
