// const path = require('path')
const IconUrl = require('~/components/IconUrl').default

describe('icon_url', () => {
  describe('load_version', () => {
    const iconUrl = new IconUrl('label', 'message', 'color')
    it('URLの型が正しい', () => {
      const expected = 'https://img.shields.io/static/v1?label=<LABEL>&message=<MESSAGE>&color=<COLOR>'
      expect(iconUrl.TEMPLATE_URL()).toBe(expected)
    })

    it('URL整形できている', () => {
      const expected = 'https://img.shields.io/static/v1?label=label&message=message&color=color'
      expect(iconUrl.getUrl()).toBe(expected)
    })
  })
})
