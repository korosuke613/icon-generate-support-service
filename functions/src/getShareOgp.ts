const functions = require('firebase-functions')
const svg2img = require('svg2img');
const fs = require('fs');
const image2base64 = require('image-to-base64');

module.exports = functions.https.onRequest(async (request: any, response: any) => {
  const params = {
    'label': request.query.la || '',
    'message': request.query.me || 'message',
    'color': request.query.co || '',
    'style': request.query.st || '',
    'logo': request.query.lo || '',
    'logoColor': request.query.lc || ''
  }

  const url = getTransUrl(params)
  await getSvg(url, '1.png')
  response.send(url)
});

const getSvg = async (url: string, fileName: string) => {
  let svgBase64 = ''
  await image2base64(url) // URLの日本語エスケープ含む
  .then(
    (res: string) => {
      svgBase64 = res
    }
  )
  await svg2img(
    `data:image/svg+xml;base64,${svgBase64}`,
    {width:600, height:314, preserveAspectRatio:'xMinYMid meet'},
    (error: any, buffer: any) => {
      fs.writeFileSync(fileName, buffer);
    });
}

const getTransUrl = (params: any) => {
  const url = `https://img.shields.io/static/v1?label=${params.label}&message=${params.message}&color=${params.color}&style=${params.style}&logo=${params.logo}&logoColor=${params.logoColor}`
  return url
}
