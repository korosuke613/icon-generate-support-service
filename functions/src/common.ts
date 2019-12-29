const fs = require('fs');
const Canvas = require('canvas'); // node-canvasをrequireする
const puppeteer = require('puppeteer');
import * as crypto from "crypto";
const admin = require('firebase-admin')

const storage = admin.storage()

const os = require('os');
const path = require('path')

exports.getTransUrl = (params: any) => {
  const url = `https://img.shields.io/static/v1?label=${params.label}&message=${params.message}&color=${params.color}&style=${params.style}&logo=${params.logo}&logoColor=${params.logoColor}`
  return url
}

exports.upload = async (params: any) => {
  const tmpdir = os.tmpdir();
  const filePath = path.join(tmpdir, 'icon.png')

  const url = exports.getTransUrl(params)
  const tempLocalFile = await getSvg(url, filePath)
  
  const metadata = {
    cacheControl: 'public,max-age=31536000', // 1年キャッシュする
    contentType: 'image/png'
  }
  const shasum = crypto.createHash('sha1')
  shasum.update(url)
  const uploadName = shasum.digest('hex')

  console.log(`upload: ${tempLocalFile}`)
  await storage.bucket().upload(tempLocalFile, {
    destination: `cards/${uploadName}.png`,
    metadata
  })

  return true
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
   
   return await gousei(fileName)
 }

const gousei = async (fileName: string) => {
  // Canvas.Image() メソッドでImg要素を作り、
  // srcに受け取ったファイルのパスをセットする
  const overImg = new Canvas.Image();
  overImg.src = await fs.readFileSync(fileName);

  const twitterCardSize = {
    width: 600,
    height: 314
  }
  const canvas = Canvas.createCanvas(twitterCardSize.width, twitterCardSize.height);
  const ctx = canvas.getContext('2d');

  // Canvas上に画像を描画する
  await ctx.drawImage(overImg, (twitterCardSize.width - overImg.width) / 2, (twitterCardSize.height - overImg.height) / 2);

  const buf = await canvas.toBuffer();
  const resultName = `${fileName}.change.png`
  await fs.writeFileSync(resultName, buf);
  return resultName
}