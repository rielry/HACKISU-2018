'use strict';
const yelpKey = 'K92teFVAnIt-SfOICRv2_YTrh7AFePL99a8SmxFl98LYnRPx793HtAPa3Rq_4Ch__Ldfln5kCpdkqG5E6XJ8YQ0f5aELNpcUBKBOjvJSmNKybTMEFAbb_ONQ0Q22WnYx'
const yelp = require('yelp-fusion');
const client = yelp.client(yelpKey);
const https = require('https');
const fs = require('fs');

exports.get_places = function(req, res) {

	//parses JSON to array of objects
	var events = JSON.parse(fs.readFileSync('../categories.json', 'utf8'));

	// console.log(events);
	events = console.log(getFit(req.query, events));
	// getFit(req.query, events);
	
	client.search({
		location: req.query.location
	}).then(response => {
	  //console.log(response.jsonBody.businesses);
	}).catch(e => {
	//   console.log(e);
	});
	
	// var results;
	// if(req.query.familyFriendly) {
	// 	results = filterAdult(res);
	// }

	// if(req.query.budget.length != 4) {
	// 	results = removeExpensive(results, req.query.budget);
	// }
	// console.log(results);
	// return results;
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
			result.push(response[i]);
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

function getFit(user, events) {
	for(var i = 0; i < events.length; i++) {
		var totalDiff = 0;

		totalDiff += Math.abs(parseInt(user['activeLevel']) - events[i]['relax']);
		totalDiff += Math.abs(parseInt(user['adventureLevel']) - events[i]['adventure']);
		totalDiff += Math.abs(parseInt(user['urbanLevel']) - events[i]['citylife']);
		totalDiff += Math.abs(parseInt(user['materialismLevel']) - events[i]['shopping']);
		totalDiff += Math.abs(parseInt(user['earlyRisers']) - events[i]['earlybird']);
		
		events[i]['userFit'] = totalDiff;
	}

	events.sort(function(a, b) {
		return a['userFit'] - b['userFit'];
	});

	return events;
}