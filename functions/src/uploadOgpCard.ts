const functions = require('firebase-functions')
const common = require("./common");


module.exports = functions.runWith({memory: '2GB'}).https.onRequest(async (request: any, response: any) => {
  const params = {
    label: request.query.la || "",
    message: request.query.me || "message",
    color: request.query.co || "green",
    style: request.query.st || "flat",
    logo: request.query.lo || "none",
    logoColor: request.query.lc || "none"
  };

  const result = await common.upload(params)

  response.send(result)
});

