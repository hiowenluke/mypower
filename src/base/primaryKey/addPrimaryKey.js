
const my = require('../..');

/** @name my.addPrimaryKey */
const fn = async (tableName, primaryKey) => {
	const result = await my.addPrimaryKeys(tableName, primaryKey);
	return result;
};

module.exports = fn;
