const express = require("express");
const app = express();
const axios = require("axios");
const path = require("path");
const bodyParser = require("body-parser");
const logger = require("morgan");
const port = 3000;
const CLIENT_ID = require("../client/js/config.js").CLIENT_ID;
const CLIENT_SECRET = require("../client/js/config.js").CLIENT_SECRET;
const REDIRECT_URL = `http://localhost:${port}/gcallback`;

module.exports = run

var token;

function run(){
	var server = require('http').createServer();
	server.on('request', app);
	server.listen(port, function(){
		console.log('Server running');
	});

	app.use(logger("dev"));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ limit: '50mb',extended: true }));
	app.use(express.static(path.join(__dirname, "../client")));


	app.get("/glogin", (req, res, next) => {
		let url = `https://www.dropbox.com/oauth2/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}`
		res.status(200).send(url);
	});

	app.get("/gcallback", (req, res, next) => {
		let code = req.query.code;
		let url = `https://api.dropboxapi.com/oauth2/token?grant_type=authorization_code&code=${code}&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&redirect_uri=${REDIRECT_URL}`
		axios.post(url)
			.then(ccResponse => {
				token = ccResponse.data.access_token;
				res.redirect('/');
			})
			.catch(err => {
				if (err.response) { 
					alert("error!")
					alert(err.response)
					res.status(err.response.status).json(err.response.data) 
				}
				else if (err.request) { res.status(504).json({"error": err.message}) }
				else res.status(500).json({"error": err.message});
			});
	});

	app.get("/user", (req, res, next) => {
		if (token){
			let url = `https://api.dropboxapi.com/2/users/get_current_account?authorization=Bearer ${token}`
			axios.post(url)
				.then(userResponse => {
					res.send(userResponse);
				})
				.catch(err => {
				  if (err.response) { 
				  	alert("error!")
				  	console.log(err.response)
				  	res.status(err.response.status).json(err.response.data) 
				  }
				  else if (err.request) { res.status(504).json({"error": err.message}) }
				  else res.status(500).json({"error": err.message});
				});
		} else {
			res.json(500, {error: "token not found. Please login first"})
		}
	})
}