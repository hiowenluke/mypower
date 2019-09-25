
const sequery = require('sequelize-raw-query');
const my = require('../..');
const config = require('../../__config');

const reInitMyPower = (databaseName) => {
	const data = config.get(); // Get the current config of mypower
	data.database = databaseName; // Change the database name
	config.init(data); // Re-initialize
};

const reInitSequery = (databaseName) => {
	const config = sequery.config.get(); // Get the current config of sequery
	config.database = databaseName; // Change the database name
	sequery.init(config); // Re-initialize
};

/** @name my.useDatabase */
const fn = async (databaseName) => {

	reInitMyPower(databaseName);
	reInitSequery(databaseName);

	const result = await my.proxy(databaseName);
	return result.warningStatus === 0;
};

module.exports = fn;
