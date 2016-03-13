'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var searchesSchema = new Schema({
	Search : String,
	Time : String
});

var searches = mongoose.model('searches', searchesSchema);
module.exports.searches = searches;