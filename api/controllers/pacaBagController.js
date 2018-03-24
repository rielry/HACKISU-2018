'use strict';
const yelpKey = 'K92teFVAnIt-SfOICRv2_YTrh7AFePL99a8SmxFl98LYnRPx793HtAPa3Rq_4Ch__Ldfln5kCpdkqG5E6XJ8YQ0f5aELNpcUBKBOjvJSmNKybTMEFAbb_ONQ0Q22WnYx'
const yelp = require('yelp-fusion');
const client = yelp.client(yelpKey);
const https = require('https');
const fs = require('fs');


exports.get_places = function(req, res) {
	//sort result by price
	res.sort(function(a, b) {
		if(a['price'].length > b['price'].length) {
			return 1;
		} else if(a['price'].length < b['price'].length) {
			return -1;
		} else {
			return 0;
		}
	});

	if(req.query.familyFriendly) {
		//filter adultentertainment,bars,barcrawl,clubcrawl,beergardens
	}
	var lon = -93.598022;
	var lat = 41.619549;
	client.search({
		longitude:lon,
		latitude:lat
	}).then(response => {
	  console.log(response.jsonBody.businesses);
	}).catch(e => {
	  console.log(e);
	});
}


function removeExpensive(response, priceUpperBound) {
	var index;
	for(var i = 0; i < response.length; i++) {
		if(response[i]['price'].length > priceUpperBound.length) {
			response.splice(i, 1);
		}
	}
}

function filterAdult(response) {
	var result = [];
	for(var i = 0; i < response.length; i++) {
		if(!containsCategory(response[i], 'adultentertainment') || !containsCategory(response[i], 'bars') 
		|| !containsCategory(response[i], 'barcrawl') || !containsCategory(response[i], 'clubcrawl')  
		|| !containsCategory(response[i], 'beergardens') ) {
			result.append(response[i]);
		}
	}
	return result;
}


function containsCategory(json, value) {
	for(var i = 0; i < json.length; i++) {
		if(json[i]['categories']['alias'] == value) {
			return true;
		} 
	}
	return false;
}
