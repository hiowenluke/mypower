
const nodber = require('../../');

/** @name nodber.getMaxPkValue */
const fn = async (tableName) => {
	const primaryKey = await nodber.getPrimaryKey(tableName);
	return await nodber.getMaxFieldValue(tableName, primaryKey);
};

module.exports = fn;
