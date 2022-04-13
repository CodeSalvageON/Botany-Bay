const express = require('express');

var app = require('express')();
var http = require('http').Server(app);
var bodyParser = require('body-parser');

var port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

const request = require('request');

var requestLoop = setInterval(function(){
  request({
      url: "https://botany-bay.codesalvageon.repl.co/",
      method: "GET",
      timeout: 10000,
      followRedirect: true,
      maxRedirects: 10
  },function(error, response, body){
      if(!error && response.statusCode == 200){
          console.log('sucess!');
      }else{
          console.log('error' + response.statusCode);
      }
  });
}, 60000);

process.on('uncaughtException', function (exception) {
  console.log(exception);
});

var Unblocker = require('unblocker');

const rp = require('request-promise');

app.use(Unblocker({
	prefix:	"/u/",
	requestMiddleware:	[]
}));

app.get('', function (req, res) {
  const index = __dirname + '/public/static/index.html';

  res.sendFile(index);
});

app.post('/getlinks', async function (req, res) {
  const url = req.body.url;
 
  rp(url)
  .then(function (html) {
    res.send(html);
    console.log(html);
    console.log(" ");
  })
  .catch(function (err) {
    throw err;
  });
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});