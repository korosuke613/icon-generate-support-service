import * as functions from 'firebase-functions';
const admin = require('firebase-admin')
admin.initializeApp(functions.config().firebase)

const image2base64 = require('image-to-base64');
const crypto = require('crypto')

// データベースの参照を作成
const fireStore = admin.firestore()

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const uploadIcon = functions.https.onRequest(async (request, response) => {
  //response.send("Hello from Firebase!");
  let base64 = ''
  let url = request.body.url
  let hash = getHash(url)

  await image2base64(url) // you can also to use url
    .then(
      (res: string) => {
        base64 = res
      }
    )
    .catch(
      (error: string) => {
        console.log(error); //Exepection error....
      }
  )
  //console.log(`url = ${url}`);
  //console.log(`hash = ${hash}`);
  //console.log(`base64 = ${base64.slice(10)}`);

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