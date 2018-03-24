'use strict';
module.exports = function(app) {
  var pacaBag = require('../controllers/pacaBagController');

  // pacaBag Routes
  app.route('/places')
	.get(pacaBag.get_places);
};
