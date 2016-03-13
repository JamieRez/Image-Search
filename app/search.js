var http = require('http');
var express = require('express');
var app = express();
var models = require('./models/recent.js');

var Imgur   = require('imgurjs');
var imgur   = new Imgur({
	clientId: 'ed33689debad009',
	clientSecret: '27aaa42d07415cf40ae9e75551118e068c9b211c'
});

var timestamp = require('unix-timestamp');



function findStr(str, offset, callback){
    
    //add to db
    var searches = models.searches;
    var newSearch = new searches({Search : str , Time : timestamp.toDate(timestamp.now())});
    newSearch.save();
    
    //search
    imgur.gallery.search({
        page : offset,
        q : str
    }).then(function(data) {
        var infoArr = [];
        data.data.forEach(function(i){
            infoArr.push({id : i.id, title : i.title, link : i.link});
        });
        callback(infoArr);
    });
   
}

function showRec(callback){
    var searches = models.searches;
    searches.find(function(err,searchHis){
        if(err){throw err}
        var dataArr = [];
        searchHis.forEach(function(i){
            dataArr.push({Search : i.Search , Time : i.Time});
        });
        callback(dataArr.reverse());
    });
}

module.exports.findStr = findStr;
module.exports.showRec = showRec;