const functions = require('firebase-functions')
const fs = require('fs');
const image2base64 = require('image-to-base64');
const sharp = require("sharp")
const Canvas = require('canvas'); // node-canvasをrequireする
const puppeteer = require('puppeteer');

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
  await getSvg(url, 'icon.png')
  response.send(url)
});

const gousei = async (fileName: string) => {
  // Canvas.Image() メソッドでImg要素を作り、
  // srcに受け取ったファイルのパスをセットする
  const baseImg = new Canvas.Image();
  baseImg.src = await fs.readFileSync('dummy.png');
  const overImg = new Canvas.Image();
  overImg.src = await fs.readFileSync(fileName);

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
 await (async () => {
  const browser = await puppeteer.launch({args: ['--no-sandbox']});
  const page = await browser.newPage();
  await page.goto(url);
  await page.setViewport({width: 300, height: 300, deviceScaleFactor:2.5});

  const clip = await page.evaluate((s: any) => {
    const el = document.querySelector(s)

    // エレメントの高さと位置を取得
    const { width, height, top: y, left: x } = el.getBoundingClientRect()
    return { width, height, x, y }
  }, 'svg')

  await page.screenshot({ clip, path: fileName })
  await browser.close();
})();
  
  await gousei(fileName)
}

const getTransUrl = (params: any) => {
  const url = `https://img.shields.io/static/v1?label=${params.label}&message=${params.message}&color=${params.color}&style=${params.style}&logo=${params.logo}&logoColor=${params.logoColor}`
  return url
}
