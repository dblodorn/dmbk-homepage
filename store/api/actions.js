/* eslint-disable */
import { endpoints } from './../../endpoints'

export default {
  async fetchCoreData ({ commit }) {
    const data = await this.$http.$get(endpoints[0].url)
    commit('setOptions', data.options)
    commit('setProjects', data.all_projects)
    const derpy = await this.$http.$get(endpoints[1].url)
    commit('setDerpy', derpy)
    await commit('setApiData', true)
  }
}
