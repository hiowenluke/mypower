
const my = require('../..');

/** @name my.getPrimaryKeys */
const fn = async (tableName) => {
	if (!tableName) return [];

	const result = await my.proxy(tableName);
	return !result ? [] : result.map(o => o.primarykey);
};

module.exports = fn;
