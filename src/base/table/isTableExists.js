
const my = require('../..');

/** @name my.isTableExists */
const fn = async (tableName, databaseName) => {
	const result = await my.proxy(databaseName, tableName);
	return result.length === 1;
};

module.exports = fn;
