const functions = require("firebase-functions");
const admin = require("firebase-admin");
import * as crypto from "crypto";
const common = require("./common");

const storage = admin.storage();

const baseRedirectUrl = 'https://beenocker.tech/'

module.exports = functions
  .runWith({ memory: "2GB" })
  .https.onRequest(async (request: any, response: any) => {
    const params = {
      label: request.query.la || "",
      message: request.query.me || "message",
      color: request.query.co || "green",
      style: request.query.st || "flat",
      logo: request.query.lo || "none",
      logoColor: request.query.lc || "none"
    };

    const userAgent = JSON.stringify(
      request.headers["user-agent"]
    ).toLowerCase();
    console.log(userAgent);
    if (
      !userAgent.includes("twitterbot") &&
      !userAgent.includes("facebook") &&
      !userAgent.includes("hatena") &&
      !userAgent.includes("slackbot")
      //!userAgent.includes("curl")
    ) {
      response.redirect(301, common.getTransRedirectUrl(baseRedirectUrl, params));
      return
    }

    const url = common.getTransUrl(params);
    const shasum = crypto.createHash("sha1");
    shasum.update(url); // ここの引数にハッシュを計算したい文字列を渡す
    const uploadName = `cards/${shasum.digest("hex")}.png`;
    const exists = await storage
      .bucket()
      .file(uploadName)
      .exists();
    if (exists[0] === false) {
      // イメージがアップロードされていない場合は、アップロードする
      console.log("image not found, upload image");
      const isUploadFinish = await common.upload(params);
      if (isUploadFinish !== true) {
        response.redirect(301, common.getTransRedirectUrl(baseRedirectUrl, params));
        return
      }
    }

    const ogpUrl = await getOgpSignedUrl(uploadName);

    // Twitterボットであるならmetaを送る
    const html = getHtml({
      cardType: "summary_large_image",
      image: ogpUrl,
      siteTitle: `"${params.label} ${params.message}"`,
      description: "BEENOCKER: easy budge generator",
      account: "@Shitimi_613"
    });
    response.send(html);
    return
  });

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
      <meta property="og:image"       content="${param.image}" />
      <meta property="fb:app_id"      content="768944716916112" />
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
