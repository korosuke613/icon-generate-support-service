const functions = require('firebase-functions')
const common = require("./common");


module.exports = functions.runWith({memory: '1GB'}).https.onRequest(async (request: any, response: any) => {
  const params = {
    'label': request.query.la || '',
    'message': request.query.me || 'message',
    'color': request.query.co || '',
    'style': request.query.st || '',
    'logo': request.query.lo || '',
    'logoColor': request.query.lc || ''
  }

  const result = await common.upload(params)

  response.send(result)
});

