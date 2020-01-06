import {
  SET_LABEL,
  SET_MESSAGE,
  SET_COLOR,
  SET_URL,
  SET_LOGS,
  SET_BASE64,
  SET_STYLE,
  SET_LOGO,
  SET_LOGO_COLOR,
  SET_EMBED_URL
} from './mutationType.js'

export const state = () => ({
  label: 'BEENOCKER',
  message: 'easy budge generator',
  color: 'purple',
  style: 'flat-square',
  url: 'https://img.shields.io/static/v1?label=BEENOCKER&message=easy%20budge%20generator&color=purple&style=flat-square',
  base64: 'please click generate',
  logs: [],
  logo: 'none',
  logoColor: 'none',
  logCount: 0,
  embedUrl: ''
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
  },
  [SET_LOGO] (state, logo) {
    state.logo = logo
  },
  [SET_LOGO_COLOR] (state, logoColor) {
    state.logoColor = logoColor
  },
  [SET_EMBED_URL] (state, embedUrl) {
    state.embedUrl = embedUrl
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
  },
  setLogo ({ commit }, logo) {
    commit(SET_LOGO, logo)
  },
  setLogoColor ({ commit }, logoColor) {
    commit(SET_LOGO_COLOR, logoColor)
  },
  setEmbedUrl ({ commit }, embedUrl) {
    commit(SET_EMBED_URL, embedUrl)
  }
}

export const getters = {
  label (state) {
    return decodeURI(state.label)
  },
  message (state) {
    return decodeURI(state.message)
  },
  color (state) {
    return state.color
  },
  url (state) {
    return encodeURI(state.url)
  },
  style (state) {
    return state.style
  },
  logs (state) {
    return state.logs
  },
  base64 (state) {
    return state.base64
  },
  logo (state) {
    return state.logo
  },
  logoColor (state) {
    return state.logoColor
  },
  param (state) {
    return `/?la=${state.label}&me=${state.message}&co=${state.color}&st=${state.style}&lo=${state.logo}&lc=${state.logoColor}`
  },
  rasterUrl (state) {
    return state.url.replace('https://img.shields.io', 'https://raster.shields.io')
  },
  sharedUrl (state) {
    return process.env.baseUrl + 'share' + `/?la=${encodeURI(state.label)}&me=${encodeURI(state.message)}&co=${state.color}&st=${state.style}&lo=${encodeURI(state.logo)}&lc=${state.logoColor}`
  },
  embedUrl (state) {
    return state.embedUrl
  }
}
