'use strict';
const yelpKey = 'K92teFVAnIt-SfOICRv2_YTrh7AFePL99a8SmxFl98LYnRPx793HtAPa3Rq_4Ch__Ldfln5kCpdkqG5E6XJ8YQ0f5aELNpcUBKBOjvJSmNKybTMEFAbb_ONQ0Q22WnYx'
const yelp = require('yelp-fusion');
const client = yelp.client(yelpKey);

exports.get_places = function(req, res) {
	if(req.query.familyFriendly) {
		//filter adultentertainment,bars,barcrawl,clubcrawl,beergardens
	}
	
}

function contains(json, value) {
	for(var i = 0; i < json.length; i++) {
		var curr = json[i]['categories'];
		for(var j = 0; j < curr.length; j++) {
			if(curr[j]['alias'] == value) {
				return true;
			}
		}
	}
	return false;
}

// //this is where we wanna do all our stuff. it should take location in long and lat as well as user personality and use that to do everything we need. first a search on the businesses using the locatoin, and then filter the places with the personality. 
	// if(req.query.budget == 'low') {

	// } else if(req.query.budget == 'medium') {

	// } else if(req.query.budget == 'high') {

	// } else {

	// }
	
	// if(req.query.familyFriendly) {
	// 	//TODO: filter adult things
	// }

	// //0 - 5 point scale
	// if(req.query.activeLevel < 3) {

	// } else {

	// }

	// if(req.query.urbanLevel < 3) {

	// } else {

	// }

	// if(req.query.materialismLevel < 3) {

	// } else {

	// }

	// if(req.query.earlyRisers < 3) {

	// } else {

	// }
	// console.log(req);