'use strict';
const yelpKey = 'K92teFVAnIt-SfOICRv2_YTrh7AFePL99a8SmxFl98LYnRPx793HtAPa3Rq_4Ch__Ldfln5kCpdkqG5E6XJ8YQ0f5aELNpcUBKBOjvJSmNKybTMEFAbb_ONQ0Q22WnYx'
const yelp = require('yelp-fusion');
const client = yelp.client(yelpKey);
const https = require('https');
const fs = require('fs');

exports.get_places = function(req, res) {

	//parses JSON to array of objects
	var events = JSON.parse(fs.readFileSync('../categories.json', 'utf8'));

	events = getFit(req.query, events);
	
	var bestBois = '';
	for(var i = 0; i < 20; i++){
		bestBois += events[i].tag +',';
	}

	bestBois = bestBois.slice(0, -1);

	client.search({
		location: req.query.location,
		categories: bestBois,
		sort_by: 'rating'
	}).then(response => {
		res.send(JSON.stringify(response.jsonBody.businesses));
	}).catch(e => {	
		console.log(e);
	});
}

function getFit(user, events) {
	var results = [];
	var j = 0;
	for(var i = 0; i < events.length; i++) {
		if(user.familyFriendly && events[i].adult === 1){
			continue;
		} else {
			var totalDiff = 0;
			totalDiff += Math.abs(parseInt(user['activeLevel']) - events[i]['relax']);
			totalDiff += Math.abs(parseInt(user['adventureLevel']) - events[i]['adventure']);
			totalDiff += Math.abs(parseInt(user['urbanLevel']) - events[i]['citylife']);
			totalDiff += Math.abs(parseInt(user['materialismLevel']) - events[i]['shopping']);
			totalDiff += Math.abs(parseInt(user['earlyRisers']) - events[i]['earlybird']);
			
			results.push(events[i]);
			results[j]['userFit'] = totalDiff;
			j++;
		}
	}

	results.sort(function(a, b) {
		return a['userFit'] - b['userFit'];
	});

	return results;
}