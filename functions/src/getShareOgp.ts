const functions = require('firebase-functions')
const svg2img = require('svg2img');
const fs = require('fs');
const image2base64 = require('image-to-base64');
const sharp = require("sharp")
const Canvas = require('canvas'); // node-canvasをrequireする

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

const gousei = async () => {
  // Canvas.Image() メソッドでImg要素を作り、
  // srcに受け取ったファイルのパスをセットする
  const baseImg = new Canvas.Image();
  baseImg.src = await fs.readFileSync('dummy.png');
  const overImg = new Canvas.Image();
  overImg.src = await fs.readFileSync('new-file.png');

  // Canvasを初期化する
  const canvas = Canvas.createCanvas(baseImg.width, baseImg.height);
  const ctx = canvas.getContext('2d');

  // Canvas上に2つの画像を描画する
  await ctx.drawImage(baseImg, 0, 0);
  await ctx.drawImage(overImg, (baseImg.width - overImg.width) / 2, (baseImg.height - overImg.height) / 2);

  const buf = await canvas.toBuffer();
  await fs.writeFileSync("test.png", buf);
}

const getSvg = async (url: string, fileName: string) => {
  let svgBase64 = ''
  await image2base64(url) // URLの日本語エスケープ含む
    .then(
      (res: string) => {
        svgBase64 = res
      }
    )

  await sharp(Buffer.from(svgBase64, 'base64'), { density: 2400 })
    .resize({ width: 400, fit: "inside" })
    .png()
    .toFile("new-file.png")

  gousei()
}

const getTransUrl = (params: any) => {
  const url = `https://img.shields.io/static/v1?label=${params.label}&message=${params.message}&color=${params.color}&style=${params.style}&logo=${params.logo}&logoColor=${params.logoColor}`
  return url
}
