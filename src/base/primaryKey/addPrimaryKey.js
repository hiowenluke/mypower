
const nodber = require('../../');

/** @name nodber.addPrimaryKey */
const fn = async (tableName, primaryKey) => {
	const result = await nodber.addPrimaryKeys(tableName, primaryKey);
	return result;
};

module.exports = fn;
