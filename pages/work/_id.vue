<template>
  <div v-if="loading">Fetching Data...</div>
  <article class="project-wrapper" v-else>
    <h1>
      {{ post.title }}
    </h1>
    <div class="image-wrapper">
      <img :src="post.project_photo.large" />
    </div>
  </article>
</template>

<script>
import { mapState } from 'vuex'
import getPostData from './../../scripts/getPostData'

export default {
  async fetch () {
    if (!this.dataLoaded) {
      this.post = await this.$http.$get(`https://dmbk.io/wp-json/dmbk-io-api/v1/project/?name=${this.$route.params.id}`)
    } else {
      this.post = getPostData(this.$route.params.id, this.projects)
    }
  },
  data () {
    return {
      post: {}
    }
  },
  computed: {
    ...mapState({
      projects: state => state.api.projects,
      dataLoaded: state => state.api.dataLoaded
    }),
    loading () {
      if (!this.dataLoaded) {
        return this.$fetchState.pending
      } else {
        return false
      }
    }
  }
}
</script>

<style>
.project-wrapper {
  width: 100%;
}
.image-wrapper {
  width: 100%;
}
</style>