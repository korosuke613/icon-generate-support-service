import {
  SET_LABEL,
  SET_MESSAGE,
  SET_COLOR
} from './mutationType.js'

export const state = () => ({
  label: 'label',
  message: 'message',
  color: 'red'
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
  }
}
