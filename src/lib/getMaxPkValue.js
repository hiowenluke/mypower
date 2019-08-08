
const nodber = require('../');

/** @name nodber.lib.getMaxPkValue */
const fn = async (tableName) => {
	const primaryKey = await nodber.lib.getPrimaryKey(tableName);
	return await nodber.lib.getMaxFieldValue(tableName, primaryKey);
};

module.exports = fn;
