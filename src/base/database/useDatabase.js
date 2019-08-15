
const sequery = require('sequelize-raw-query');
const nodber = require('../../');

const reInitNodber = (databaseName) => {
	const config = nodber.config.get();
	config.database = databaseName;
	nodber.config.init(config);
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

	const result = await nodber.proxy(databaseName);
	return result.warningStatus === 0;
};

module.exports = fn;
