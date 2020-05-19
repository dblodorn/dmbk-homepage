<template>
  <div v-if="$fetchState.pending">
    Fetching post #{{ $route.params.id }}...
  </div>
  <div v-else>
    <h1>
      {{ post.title }}
    </h1>
    <p>
      <n-link to="/">
        Back to posts
      </n-link>
    </p>
  </div>
</template>

<script>
export default {
  async fetch () {
    this.post = await this.$http.$get(`https://dmbk.io/wp-json/dmbk-io-api/v1/project/?name=${this.$route.params.id}`)
  },
  data () {
    return {
      post: {}
    }
  }
}
</script>
