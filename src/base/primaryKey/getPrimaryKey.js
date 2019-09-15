
const nodber = require('../..');

/** @name nodber.getPrimaryKey */
const fn = async (tableName) => {

	// Get multiple primary keys, such as ["billid", "itemno]
	const primaryKeys = await nodber.getPrimaryKeys(tableName);

	// Because multiple primary keys have been sorted in order, the first element
	// of the array is the first primary key, in line with expectations.
	return !primaryKeys || primaryKeys.length === 0 ? null : primaryKeys[0];
};

module.exports = fn;
