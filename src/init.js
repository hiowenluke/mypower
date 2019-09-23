
const sequery = require('sequelize-raw-query');
const myCli = require('mysql-cli-exec');
const config = require('./__config');

/** @name my.init */
const fn = (cfg) => {
	cfg.dialect = 'mysql';

	config.init(cfg);
	sequery.init(cfg);
	myCli.init(cfg);
};

module.exports = fn;
