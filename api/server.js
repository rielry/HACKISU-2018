'use strict';
const yelpKey = 'K92teFVAnIt-SfOICRv2_YTrh7AFePL99a8SmxFl98LYnRPx793HtAPa3Rq_4Ch__Ldfln5kCpdkqG5E6XJ8YQ0f5aELNpcUBKBOjvJSmNKybTMEFAbb_ONQ0Q22WnYx'
const yelp = require('yelp-fusion');
const cors = require('cors');
const client = yelp.client(yelpKey);
const express        = require('express');

const app            = express();
app.use(cors());
const port = process.env.PORT || 3000;


const  bodyParser = require('body-parser');
  
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./routes/pacaBagRoutes'); //importing route
routes(app); //register the route


app.listen(port);


console.log('pacaBag RESTful API server started on: ' + port);