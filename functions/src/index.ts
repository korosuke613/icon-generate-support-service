import * as functions from 'firebase-functions';
const admin = require('firebase-admin')
import serviceAccount from './app_engin_key'

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'gs://aikon-eaf3a.appspot.com/'
});
const image2base64 = require('image-to-base64');
const crypto = require('crypto')

// データベースの参照を作成
const fireStore = admin.firestore()

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const getIcon = functions.https.onRequest(async (request, response) => {
  const url = request.body.url
  if (url === undefined || !url.includes('https://img.shields.io/static/v1')) {
    response.send("Invalid parameter: url")
    return
  }
  const hash = getHash(url)

  const docRef = fireStore.collection('icon_cache').doc(hash)

  let base64: string = 'No such document'
  await docRef.get().then((doc: any) => {
    if (!doc.exists) {
      console.log('No such document!');
    } else {
      base64 = `data:image/svg+xml;base64,${doc.data().base64}`
    }
  })
    .catch((err: string) => {
      if (err !== 'No such document!') {
        console.log('Error getting document', err);
      }
    });
  const log = {
    'url': url,
    'hash': hash,
    'base64': base64
  }
  console.log(log)

  response.send(base64)
});

export const uploadIcon = functions.https.onRequest(async (request, response) => {
  //response.send("Hello from Firebase!");
  let base64 = ''
  const url = request.body.url
  if (url === undefined || !url.includes('https://img.shields.io/static/v1')) {
    response.send("Invalid parameter: url")
    return
  }

  const hash = getHash(url)

  await image2base64(url) // URLの日本語エスケープ含む
    .then(
      (res: string) => {
        base64 = res
      }
    )
  console.log(`url = ${url}`);
  console.log(`hash = ${hash}`);
  console.log(`base64 = ${base64.slice(10)}`);

  const docRef = fireStore.collection('icon_cache').doc(hash)
  docRef.set({
    'url': url,
    'base64': base64
  })
  response.send('OK!')
});

const getHash = (url: string) => {
  const shasum = crypto.createHash('sha1')
  shasum.update(url) // ここの引数にハッシュを計算したい文字列を渡す
  return shasum.digest('hex')
}

if (!process.env.FUNCTION_NAME || process.env.FUNCTION_NAME === 'uploadOgpCard') {
  exports.uploadOgpCard = require('./uploadOgpCard');
}

if (!process.env.FUNCTION_NAME || process.env.FUNCTION_NAME === 'getShare') {
  exports.getShare = require('./getShare');
}