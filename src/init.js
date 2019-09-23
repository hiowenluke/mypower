
const sequery = require('sequelize-raw-query');
const myCli = require('mysql-cli-exec');
const config = require('./__config');

/** @name nodber.init */
const fn = (cfg) => {
	config.init(cfg);
	sequery.init(cfg);
	myCli.init(cfg);
};

module.exports = fn;
