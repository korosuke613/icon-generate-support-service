const functions = require('firebase-functions')
import * as crypto from "crypto";
const common = require("./common");
const admin = require('firebase-admin')
const storage = admin.storage()

const os = require('os');
const path = require('path')

module.exports = functions.runWith({memory: '1GB'}).https.onRequest(async (request: any, response: any) => {
  const params = {
    'label': request.query.la || '',
    'message': request.query.me || 'message',
    'color': request.query.co || '',
    'style': request.query.st || '',
    'logo': request.query.lo || '',
    'logoColor': request.query.lc || ''
  }

  const tmpdir = os.tmpdir();
  const filePath = path.join(tmpdir, 'icon.png')

  const url = common.getTransUrl(params)
  const tempLocalFile = await common.getSvg(url, filePath)
  
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
  response.send('Success')
});

