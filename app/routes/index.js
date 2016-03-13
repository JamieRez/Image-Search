'use strict';

var express = require('express');
var path = process.cwd();
var app = express();
var search =require(path + '/app/search.js');

	app.get('/', function(req, res) {
		res.sendFile(path + '/README.md')
	});
	
	app.route('/search/*').get(function(req,res){
		var pageOffset = req.query.offset;
		if(pageOffset == undefined){
			pageOffset = 0;
		}
		search.findStr(req.params[0], pageOffset, function(str){
			res.send(str);
		});
	});
	
	app.route('/recent').get(function(req,res){
		search.showRec(function(data){
			res.send(data);
		});
	})

app.listen(8080, function(req,res){
    console.log("Listening on port 8080");
});