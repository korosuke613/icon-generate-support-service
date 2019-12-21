const crypto = require('crypto')

export default class IconUrl {
  constructor (label, message, color, style) {
    this.label = label
    this.message = message
    this.color = color
    this.style = style
  }

  TEMPLATE_URL () {
    return 'https://img.shields.io/static/v1?label=<LABEL>&message=<MESSAGE>&color=<COLOR>&style=<STYLE>'
  }

  getUrl () {
    const result = this.TEMPLATE_URL().replace('<LABEL>', this.label).replace('<MESSAGE>', this.message)
      .replace('<COLOR>', this.color).replace('<STYLE>', this.style)
    return result
  }

  getHash () {
    const shasum = crypto.createHash('sha1')
    shasum.update(this.getUrl()) // ここの引数にハッシュを計算したい文字列を渡す
    return shasum.digest('hex')
  }

  getHtmlTag () {
    return `<img src="${this.getUrl()}" />`
  }

  setParam (label, message, color, style) {
    this.label = label
    this.message = message
    this.color = color
    this.style = style
  }
}
