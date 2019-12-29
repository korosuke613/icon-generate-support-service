const functions = require("firebase-functions");
const admin = require("firebase-admin");
import * as crypto from "crypto";
const common = require("./common");

const storage = admin.storage();

module.exports = functions.https.onRequest(
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
    const ogpUrl = await getOgpSignedUrl(url);
    const html = getHtml({
      cardType: "summary_large_image",
      image: ogpUrl,
      siteUrl: "https://aikon-eaf3a.firebaseapp.com",
      siteTitle: "AIKON",
      description: "icon generate support service"
    });

    response.send(html);
  }
);

const getHtml = (param: any) => {
  const template = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="utf-8" />
      @* Twitter cards *@
      <meta name="twitter:card" content="${param.cardType}" />
      <meta name="twitter:site" content="${param.siteUrl}">
      <meta name="twitter:title" content="${param.siteTitle}" />
      <meta name="twitter:description" content="${param.description}" />
      <meta name="twitter:image" content="${param.image}">

      <title></title>
  </head>
  <body>
  </body>
  `;

  return template;
};

const getOgpSignedUrl = async (url: any) => {
  const shasum = crypto.createHash("sha1");
  shasum.update(url); // ここの引数にハッシュを計算したい文字列を渡す
  const uploadName = shasum.digest("hex");

  const result = await storage
    .bucket()
    .file(`cards/${uploadName}.png`)
    .getSignedUrl({
      action: "read",
      expires: Date.now() + 1000 * 60 * 60 * 24 * 30 // 1month
    });
  return result;
};
