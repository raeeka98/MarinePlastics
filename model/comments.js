//mode/comments.js
'use strict';
//import dependency
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var StepZilla = require('react-stepzilla')

var SRSdataSchema = new Schema({
  //debris: [{
    FreshCig: Number,
    WeatheredCig: Number,
    FreshFline: Number,
    WeatheredFline: Number,
    FreshGlass: Number,
    WeatheredGlass: Number,
    FreshPaper: Number,
    WeatheredPaper: Number,
    FreshFplastic: Number,
    WeatheredFplastic: Number,
    FreshMiscPlastic: Number,
    WeatheredMiscPlastic: Number,
    FreshPlasticBottle: Number,
    WeatheredPlasticBottle: Number,
    FreshPlasticCap: Number,
    WeatheredPlasticCap: Number,
    FreshStyrofoam: Number,
    WeatheredStyrofoam: Number,
    FreshWood: Number,
    WeatheredWood: Number,
    FreshUrethaneFoam: Number,
    WeatheredUrethaneFoam: Number,
    FreshPlasticCup: Number,
    WeatheredPlasticCup: Number,
    FreshPlasticStraw: Number,
    WeatheredPlasticStraw: Number,
    FreshCottonCloth: Number,
    WeatheredCottonCloth: Number,
    FreshPolyRope: Number,
    WeatheredPolyRope: Number,
    FreshAlumCan: Number,
    WeatheredAlumCan: Number,
    FreshHygItems: Number,
    WeatheredHygItems: Number,
    FreshMetal: Number,
    WeatheredMetal: Number,
    FreshTileBrick: Number,
		WeatheredTileBrick: Number,
  //}] // an array of debris totals for types should be useful
});

//create new instance of the mongoose.schema. the schema takes an object that shows
//the shape of your database entries.
var CommentsSchema = new Schema({
	user: String,
	email: String,
	org: String,
	input_date: String,
	date: String,
	beach: String,
	reason: String,
	st: String,
	lat: Number,
	lon: Number,
	slope: String,
	nroName: String,
	nroDist: Number,
	aspect: String,
	lastTide: String,
	nextTide: String,
	windDir: String,
	majorUse: String,
  weight: Number,
	NumberOfPeople: Number,
  SRSData: SRSdataSchema,
  SRSTotal: Number,

});

//export our module to use in server.js
module.exports = mongoose.model('Comment', CommentsSchema);
