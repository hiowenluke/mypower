
const my = require('../..');

/** @name my.truncateTable */
const fn = async (tableName, databaseName) => {
	const result = await my.proxy(databaseName, tableName);
	return result.warningStatus === 0;
};

module.exports = fn;
