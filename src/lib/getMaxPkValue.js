
const nodber = require('../');

/** @name nodber.lib.getMaxPkValue */
const fn = async (tablename) => {
	const primaryKey = await nodber.lib.getPrimaryKey(tablename);
	return await nodber.lib.getMaxFieldValue(tablename, primaryKey);
};

module.exports = fn;
