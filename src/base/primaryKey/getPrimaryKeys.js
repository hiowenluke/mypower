
const nodber = require('../../');

/** @name nodber.getPrimaryKeys */
const fn = async (tableName) => {
	if (!tableName) return [];

	const result = await nodber.proxy(tableName);
	return !result ? [] : result.map(o => o.primarykey);
};

module.exports = fn;
