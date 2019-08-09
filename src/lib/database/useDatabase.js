
const sequery = require('sequelize-raw-query');

const reInitNodber = (databaseName) => {
	const config = global.nodber.config.get();
	config.database = databaseName;
	global.nodber.config.init(config);
};

const reInitSequery = (databaseName) => {
	const config = sequery.config.get();
	config.database = databaseName;
	sequery.init(config);
};

/** @name nodber.useDatabase */
const fn = async (databaseName) => {

	reInitNodber();
	reInitSequery();

	await global.nodber.proxy(databaseName);
};

module.exports = fn;
