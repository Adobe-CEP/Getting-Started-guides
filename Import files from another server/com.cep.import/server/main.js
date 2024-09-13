const express = require("express");
const app = express();
const request = require('request');
const http = require('http');
const path = require("path");
const bodyParser = require("body-parser");
const logger = require("morgan");
const fs = require('fs');
const httpServer = http.Server(app);

module.exports = run
	
function run(){
	var port = 3200;
	var hostname = "localhost"
	httpServer.listen(port);

	app.use(logger("dev"));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ limit: '50mb',extended: true }));
	app.use(express.static(path.join(__dirname, "../client")));

	app.get("/import", (req, res, next) => {

		var path = req.headers["directory"] + "/placeholder.png"
		var uri = "http://via.placeholder.com/350x150";

		var saveImage = function(uri, filepath, callback){
			request.head(uri, function(err, res, body){
				request(uri).pipe(fs.createWriteStream(filepath)).on('close', callback);
			});
		};

		saveImage(uri, path, function(){
			res.status(200).send(path)
		});


	});
}