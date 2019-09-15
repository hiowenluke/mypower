
const nodber = require('../..');

/** @name nodber.isTableExists */
const fn = async (tableName) => {
	const result = await nodber.proxy(tableName);
	return result.length === 1;
};

module.exports = fn;
