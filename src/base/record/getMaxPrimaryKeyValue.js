
const my = require('../..');

/** @name my.getMaxPrimaryKeyValue */
const fn = async (tableName) => {
	const primaryKey = await my.getPrimaryKey(tableName);
	return await my.getMaxFieldValue(tableName, primaryKey);
};

module.exports = fn;
