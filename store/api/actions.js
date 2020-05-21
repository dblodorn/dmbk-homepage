/* eslint-disable */
import { endpoints } from './../../endpoints'

export default {
  async fetchCoreData ({ commit }) {
    const data = await this.$http.$get((process.env.NODE_ENV === 'development') ? endpoints[0].url : '/_nuxt/core-data.json')
    commit('setOptions', data.options)
    commit('setProjects', data.all_projects)
    const derpy = await this.$http.$get((process.env.NODE_ENV === 'development') ? endpoints[1].url : '/_nuxt/derpy-data.json')
    commit('setDerpy', derpy)
    await commit('setApiData', true)
  }
}
