<template>
  <div v-if="loading">Fetching Data...</div>
  <article v-else class="project-wrapper responsive-grid sm-col-1 md-col-1 lg-col-2">
    <div class="col pad-single">
      <div class="copy-wrapper mw-med">
        <h1 class="stroke-type-bw mw-sm">{{ post.title }}</h1>
        <div class="description y-pad-double" v-html="post.description"/>
        <menu class="project-links flex-column">
          <a class="p link-style-a" v-for="link of post.project_links" :key="link.url" :href="link.link_url">
            <span v-html="link.link_copy" />
          </a>
        </menu>
      </div>
    </div>
   <div class="col image-col">
      <div class="image-wrapper">
        <div class="image-sizer image-cover">
          <img :src="`${post.project_photo.large}`" />
        </div>
      </div>
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
  },
  head () {
    return {
      title: this.post.title,
      meta: [
        { hid: 'description', name: 'description', content: this.post.description }
      ]
    }
  }
}
</script>

<style>
.project-wrapper {
  width: 100%;
  margin-bottom: var(--pad-big);
}
.image-wrapper {
  width: 100%;
  position: relative;
  height: 0;
  padding-bottom: 100%;
  overflow-y: visible;
}
.image-col {
  grid-row: 1;
  border-bottom: var(--border-black);
  margin-bottom: var(--pad-big);
}
@media (--lg) {
  .image-col {
    grid-row: auto;
    border-bottom: 0;
    margin-bottom: 0;
    border-left: var(--border-black);
  }
  .project-wrapper {
    width: 100%;
    margin-bottom: 0;
  }
}
</style>