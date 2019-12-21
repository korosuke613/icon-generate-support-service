import {
  SET_LABEL,
  SET_MESSAGE,
  SET_COLOR,
  SET_URL,
  SET_LOGS,
  SET_BASE64,
  SET_STYLE
} from './mutationType.js'

export const state = () => ({
  label: 'label',
  message: 'message',
  color: 'green',
  style: 'plastic',
  url: 'https://img.shields.io/static/v1?label=label&message=message&color=red',
  base64: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iOTYiIGhlaWdodD0iMjAiPjxsaW5lYXJHcmFkaWVudCBpZD0iYiIgeDI9IjAiIHkyPSIxMDAlIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiNiYmIiIHN0b3Atb3BhY2l0eT0iLjEiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3Atb3BhY2l0eT0iLjEiLz48L2xpbmVhckdyYWRpZW50PjxjbGlwUGF0aCBpZD0iYSI+PHJlY3Qgd2lkdGg9Ijk2IiBoZWlnaHQ9IjIwIiByeD0iMyIgZmlsbD0iI2ZmZiIvPjwvY2xpcFBhdGg+PGcgY2xpcC1wYXRoPSJ1cmwoI2EpIj48cGF0aCBmaWxsPSIjNTU1IiBkPSJNMCAwaDM3djIwSDB6Ii8+PHBhdGggZmlsbD0iIzk3Y2EwMCIgZD0iTTM3IDBoNTl2MjBIMzd6Ii8+PHBhdGggZmlsbD0idXJsKCNiKSIgZD0iTTAgMGg5NnYyMEgweiIvPjwvZz48ZyBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iRGVqYVZ1IFNhbnMsVmVyZGFuYSxHZW5ldmEsc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxMTAiPiA8dGV4dCB4PSIxOTUiIHk9IjE1MCIgZmlsbD0iIzAxMDEwMSIgZmlsbC1vcGFjaXR5PSIuMyIgdHJhbnNmb3JtPSJzY2FsZSguMSkiIHRleHRMZW5ndGg9IjI3MCI+bGFiZWw8L3RleHQ+PHRleHQgeD0iMTk1IiB5PSIxNDAiIHRyYW5zZm9ybT0ic2NhbGUoLjEpIiB0ZXh0TGVuZ3RoPSIyNzAiPmxhYmVsPC90ZXh0Pjx0ZXh0IHg9IjY1NSIgeT0iMTUwIiBmaWxsPSIjMDEwMTAxIiBmaWxsLW9wYWNpdHk9Ii4zIiB0cmFuc2Zvcm09InNjYWxlKC4xKSIgdGV4dExlbmd0aD0iNDkwIj5tZXNzYWdlPC90ZXh0Pjx0ZXh0IHg9IjY1NSIgeT0iMTQwIiB0cmFuc2Zvcm09InNjYWxlKC4xKSIgdGV4dExlbmd0aD0iNDkwIj5tZXNzYWdlPC90ZXh0PjwvZz4gPC9zdmc+',
  logs: [],
  logCount: 0
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
    state.logs.push(url)
  },
  [SET_LOGS] (state, logs) {
    state.logs = logs
  },
  [SET_BASE64] (state, base64) {
    state.base64 = base64
  },
  [SET_STYLE] (state, style) {
    state.style = style
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
  },
  setBase64 ({ commit }, base64) {
    commit(SET_BASE64, base64)
  },
  setStyle ({ commit }, style) {
    commit(SET_STYLE, style)
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
  },
  style (state) {
    return state.style
  },
  logs (state) {
    return state.logs
  },
  base64 (state) {
    return state.base64
  }
}
