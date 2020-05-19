import axios from 'axios'

export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    '@/assets/css/main.css',
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxt/http',
    '@nuxtjs/axios',
    '@nuxtjs/dotenv'
  ],
  generate: {
    routes (callback) {
      axios.get('https://dmbk.io/wp-json/dmbk-io-api/v1/derpyvision')
        .then((res) => {
          const routes = res.data.derpy_nav.map((post) => {
            return '/work/' + post.title
          })
          callback(null, routes)
        })
        .catch(callback)
    },
    subFolders: false
  },
  http: {
    // proxyHeaders: false
  },
  build: {
    postcss: {
      plugins: {
        autoprefixer: {},
        'postcss-custom-media': {
          importFrom: [
            () => {
              const { breakpoints } = require('./globals')
              const customMedia = {}
              for (let size in breakpoints) {
                customMedia[`--${size}`] = `(min-width: ${breakpoints[size]}px)`
              }
              return { customMedia }
            }
          ]
        }
      }
    },
    extend (config, ctx) {
    }
  }
}
