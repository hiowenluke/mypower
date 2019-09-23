
const my = require('../..');

/** @name my.isEmptyTable */
const fn = async (tableName) => {
	const result = await my.proxy(tableName);
	return !result || result.length === 0;
};

module.exports = fn;
