
const sequery = require('sequelize-raw-query');
const nodber = require('../../');
const config = require('../../__config');

const reInitNodber = (databaseName) => {
	const data = config.get();
	data.database = databaseName;
	config.init(data);
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
