import axios from 'axios'
import FetchJsonWebpackPlugin from 'fetch-json-webpack-plugin'
import endpoints from './endpoints'

export default {
  mode: 'universal',
  head: {
    title: process.env.npm_package_name || 'DMBK',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  loading: { color: '#fff' },
  css: [
    '@/assets/css/main.css',
  ],
  plugins: [
  ],
  buildModules: [],
  modules: [
    '@nuxt/http',
    '@nuxtjs/axios',
    '@nuxtjs/dotenv'
  ],
  http: {},
  server: {
    port: 8000,
    host: '0.0.0.0'
  },
  generate: {
    plugins: [
      new FetchJsonWebpackPlugin({
        ...endpoints
      })
    ],
    routes (callback) {
      axios.get('https://dmbk.io/wp-json/dmbk-io-api/v1/derpyvision')
        .then((res) => {
          const routes = res.data.derpy_nav.map((post) => {
            return '/work/' + post.slug
          })
          callback(null, routes)
        })
        .catch(callback)
    },
    subFolders: false
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
    extractCSS: true,
    optimization: {
      splitChunks: {
        cacheGroups: {
          styles: {
            name: 'styles',
            test: /\.(css|vue)$/,
            chunks: 'all',
            enforce: true
          }
        }
      }
    },
    extend (config, ctx) {
    }
  }
}
