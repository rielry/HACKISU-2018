'use strict';
const yelpKey = 'K92teFVAnIt-SfOICRv2_YTrh7AFePL99a8SmxFl98LYnRPx793HtAPa3Rq_4Ch__Ldfln5kCpdkqG5E6XJ8YQ0f5aELNpcUBKBOjvJSmNKybTMEFAbb_ONQ0Q22WnYx'
const yelp = require('yelp-fusion');
const client = yelp.client(yelpKey);
exports.get_places = function(req, res) {
	//this is where we wanna do all our stuff. it should take location in long and lat as well as user personality and use that to do everything we need. first a search on the businesses using the locatoin, and then filter the places with the personality. 
	client.search()
}