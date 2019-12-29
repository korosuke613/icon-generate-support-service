const functions = require("firebase-functions");
const admin = require("firebase-admin");
import * as crypto from "crypto";
const common = require("./common");

const storage = admin.storage();

module.exports = functions.runWith({memory: '1GB'}).https.onRequest(
  async (request: any, response: any) => {
    const params = {
      label: request.query.la || "",
      message: request.query.me || "message",
      color: request.query.co || "",
      style: request.query.st || "",
      logo: request.query.lo || "",
      logoColor: request.query.lc || ""
    };

    const url = common.getTransUrl(params);
    const shasum = crypto.createHash("sha1");
    shasum.update(url); // ここの引数にハッシュを計算したい文字列を渡す
    const uploadName = `cards/${shasum.digest("hex")}.png`;
    const exists = await storage.bucket().file(uploadName).exists();
    if (exists[0] === false) {
      // イメージがアップロードされていない場合は、アップロードする
      const isUploadFinish = await common.upload(params)
      if (isUploadFinish === false) {
        response.redirect(301, 'https://aikon-eaf3a.firebaseapp.com')
      }
    }

    const ogpUrl = await getOgpSignedUrl(uploadName);
    console.log(ogpUrl)

    const userAgent = JSON.stringify(request.headers["user-agent"]).toLowerCase();
    console.log(userAgent);

    if (
      userAgent.includes("twitterbot") ||
      userAgent.includes("facebook") ||
      userAgent.includes("line")
    ) {
      // Twitterボットであるならmetaを送る
      const html = getHtml({
        cardType: "summary_large_image",
        image: ogpUrl,
        siteUrl: "https://aikon-eaf3a.firebaseapp.com",
        siteTitle: "AIKON",
        description: "icon generate support service",
        account: '@Shitimi_613'
      });
      response.send(html);
    }

    response.redirect(301, 'https://aikon-eaf3a.firebaseapp.com')
  }
);

const getHtml = (param: any) => {
  const template = `
  <!DOCTYPE html>
  <html lang="en">
  <head prefix="og: http://ogp.me/ns# website: http://ogp.me/ns/website#">
      <meta charset="utf-8" />
      <title>${param.siteTitle}</title>
      <meta name="description" content="${param.description}">
      <meta property="og:title"       content=${param.siteTitle}>
      <meta property="og:description" content="${param.description}" />
      <meta property="og:type"        content="website" />
      <meta property="og:url"         content="${param.siteUrl}" />
      <meta property="og:image"       content="${param.image}" />
      <meta property="fb:app_id"      content="1234567890123456" />
      <meta name="twitter:card"       content="${param.cardType}" />
      <meta name="twitter:site"       content="${param.account}" />
      <meta name="twitter:creator"    content="${param.account}" />
      <title></title>
  </head>
  <body>
  </body>
  `;

  return template;
};

const getOgpSignedUrl = async (uploadName: any) => {
  const result = await storage
    .bucket()
    .file(uploadName)
    .getSignedUrl({
      action: "read",
      expires: Date.now() + 1000 * 60 * 60 * 24 * 30 // 1month
    });
  return result;
};
