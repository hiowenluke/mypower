
const sequery = require('sequelize-raw-query');
const config = require('./__config');

/** @name nodber.init */
const fn = (cfg) => {
	config.init(cfg);
	sequery.init(cfg);
};

module.exports = fn;
