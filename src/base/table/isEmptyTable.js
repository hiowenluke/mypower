
const nodber = require('../../');

/** @name nodber.isEmptyTable */
const fn = async (tableName) => {
	const result = await nodber.proxy(tableName);
	return !result || result.length === 0;
};

module.exports = fn;
