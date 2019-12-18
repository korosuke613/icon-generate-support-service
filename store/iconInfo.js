import {
  SET_LABEL,
  SET_MESSAGE,
  SET_COLOR,
  SET_URL
} from './mutationType.js'

export const state = () => ({
  label: 'label',
  message: 'message',
  color: 'red',
  url: 'https://img.shields.io/static/v1?label=label&message=message&color=red'
})

export const mutations = {
  [SET_LABEL] (state, label) {
    state.label = label
  },
  [SET_MESSAGE] (state, message) {
    state.message = message
  },
  [SET_COLOR] (state, color) {
    state.color = color
  },
  [SET_URL] (state, url) {
    state.url = url
  }
}

export const actions = {
  setLabel ({ commit }, label) {
    commit(SET_LABEL, label)
  },
  setMessage ({ commit }, message) {
    commit(SET_MESSAGE, message)
  },
  setColor ({ commit }, color) {
    commit(SET_COLOR, color)
  },
  setUrl ({ commit }, url) {
    commit(SET_URL, url)
  }
}

export const getters = {
  label (state) {
    return state.label
  },
  message (state) {
    return state.message
  },
  color (state) {
    return state.color
  },
  url (state) {
    return state.url
  }
}
