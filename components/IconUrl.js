const crypto = require('crypto')

export default class IconUrl {
  constructor () {
    this.label = 'label'
    this.message = 'message'
    this.color = 'green'
    this.style = 'flat'
    this.logo = 'none'
  }

  TEMPLATE_URL () {
    return 'https://img.shields.io/static/v1?label=<LABEL>&message=<MESSAGE>&color=<COLOR>&style=<STYLE>'
  }

  getUrl () {
    let result = this.TEMPLATE_URL().replace('<LABEL>', this.label).replace('<MESSAGE>', this.message)
      .replace('<COLOR>', this.color).replace('<STYLE>', this.style)

    if (this.logo !== 'none') {
      const logoName = this.logo.replace(' ', '-').toLowerCase()
      result = `${result}&logo=${logoName}`
    }
    if (this.logoColor !== 'none') {
      result = `${result}&logoColor=${this.logoColor}`
    }
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

  setParam (label, message, color, style, logo, logoColor) {
    this.label = label
    this.message = message
    this.color = color
    this.style = style
    this.logo = logo
    this.logoColor = logoColor
  }
}
