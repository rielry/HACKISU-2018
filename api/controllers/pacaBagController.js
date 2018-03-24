'use strict';
const yelpKey = 'K92teFVAnIt-SfOICRv2_YTrh7AFePL99a8SmxFl98LYnRPx793HtAPa3Rq_4Ch__Ldfln5kCpdkqG5E6XJ8YQ0f5aELNpcUBKBOjvJSmNKybTMEFAbb_ONQ0Q22WnYx'
const yelp = require('yelp-fusion');
const client = yelp.client(yelpKey);

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

	var results;
	if(req.query.familyFriendly) {
		results = filterAdult(res);
	}

	results = removeExpensive(results, req.query.budget);
}

function removeExpensive(response, priceUpperBound) {
	var result = [];
	for(var i = 0; i < response.length; i++) {
		if(response[i]['price'].length <= priceUpperBound.length) {
			result.push(response[i]);
		}
	}
	return result;
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
