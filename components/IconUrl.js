export class IconUrl {
  constructor (label, message, color) {
    this.label = label
    this.message = message
    this.color = color
  }

  TEMPLATE_URL () {
    return 'https://img.shields.io/static/v1?label=<LABEL>&message=<MESSAGE>&color=<COLOR>'
  }

  getUrl () {
    const result = this.TEMPLATE_URL().replace('<LABEL>', this.label).replace('<MESSAGE>', this.message).replace('<COLOR>', this.color)
    return result
  }
}
