const express = require('express');
const bodyParser = require('body-parser');
const index = require('./index.js')

module.exports.createServer = () => {
  const app = express();
  app.use(bodyParser.json());
  
  app.get('/', function (req, res) {
      let challenge = req.query["hub.challenge"];
      res.send(challenge);
  })

  app.post('/', function (req, res) {
      index.getData(req.body)
      res.sendStatus(200);
  })

  app.listen(8080);
}
