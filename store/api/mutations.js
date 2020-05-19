export default {
  setOptions (state, data = {}) {
    state.options = data
  },
  setProjects (state, data = {}) {
    state.projects = data
  },
  setApiData (state, bool = false) {
    state.dataLoaded = bool
  }
}
