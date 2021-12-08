const fs = require('fs');
const express = require('express');

var app = require('express')();
var http = require('http').Server(app);
var bodyParser = require('body-parser');

var port = process.env.PORT || 3000;
var io = require('socket.io')(http);

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

const {
	type,
	project_id,
	private_key_id,
	private_key,
	client_email,
	client_id,
	auth_uri,
	token_uri,
	auth_provider_x509_cert_url,
	client_x509_cert_url
} = process.env;

const serviceAccount = {
	type,
	project_id,
	private_key_id,
	private_key,
	client_email,
	client_id,
	auth_uri,
	token_uri,
	auth_provider_x509_cert_url,
	client_x509_cert_url
};

const admin = require('firebase-admin');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

var Unblocker = require('unblocker');

const rp = require('request-promise');
const cheerio = require('cheerio');

const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');

const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

app.use(Unblocker({
	prefix:	"/u/",
	requestMiddleware:	[]
}));

app.get('', function (req, res) {
  const index = __dirname + '/public/static/index.html';

  res.sendFile(index);
});

app.get('/getchat', async function (req, res) {
  const chatRef = db.collection('botany-bay').doc('chatlog');
  const doc = await chatRef.get();

  res.send(doc.data().log);
});

app.post('/postchat', async function (req, res) {
  const message = req.body.message;
  const username = req.body.username;

  const clean_username = DOMPurify.sanitize(username);
  const clean_message = DOMPurify.sanitize(message);

  if (clean_username === "" || clean_username === null || clean_username === undefined) {
    clean_username = "Anonymous";
  }
   
  const chatRef = db.collection('botany-bay').doc('chatlog');
  const doc = await chatRef.get();

  await chatRef.set({
    log : doc.data().log + "<br/><div class='bbchat glow-augment'><b>" + clean_username + "</b></b><hr/>" + clean_message + "</div>"
  });

  res.send("");
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

  const chatRef = db.collection('botany-bay').doc('chatlog');

  async function fixChat () {
    const doc = await chatRef.get();

    if (!doc.exists) {
      const fix_data = {
        log : ""
      }

      await chatRef.set(fix_data);

      console.log("FIXED");
    }

    else {
      console.log("No Fix needed.");
    }
  }

  fixChat();
});