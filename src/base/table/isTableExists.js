
const my = require('../..');

/** @name my.isTableExists */
const fn = async (tableName) => {
	const result = await my.proxy(tableName);
	return result.length === 1;
};

module.exports = fn;
