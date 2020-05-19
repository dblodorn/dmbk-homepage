<template>
  <div class="container">
    <p v-if="$fetchState.pending">
      Fetching posts...
    </p>
    <p v-else-if="$fetchState.error">
      Error while fetching posts: {{ $fetchState.error.message }}
    </p>
    <ul v-else>
      <li v-for="post of posts.derpy_nav" :key="post.title">
        <n-link class="h1" :to="`/work/${post.title}`">
          {{ post.title }}
        </n-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  async fetch () {
    this.posts = await this.$http.$get('https://dmbk.io/wp-json/dmbk-io-api/v1/derpyvision')
  },
  data () {
    return {
      posts: []
    }
  }
}
</script>
