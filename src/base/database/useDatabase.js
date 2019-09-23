
const sequery = require('sequelize-raw-query');
const my = require('../..');
const config = require('../../__config');

const reInitMyPower = (databaseName) => {
	const data = config.get();
	data.database = databaseName;
	config.init(data);
};

const reInitSequery = (databaseName) => {
	const config = sequery.config.get();
	config.database = databaseName;
	sequery.init(config);
};

/** @name my.useDatabase */
const fn = async (databaseName) => {

	reInitMyPower(databaseName);
	reInitSequery(databaseName);

	const result = await my.proxy(databaseName);
	return result.warningStatus === 0;
};

module.exports = fn;
