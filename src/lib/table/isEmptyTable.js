
const nodber = require('../../');

/** @name nodber.isEmptyTable */
const fn = async (tableName) => {
	const result = await nodber.exec(`select * from ${tableName} limit 0, 1`);
	return !result || result.length === 0;
};

module.exports = fn;
