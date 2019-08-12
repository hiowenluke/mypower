
const nodber = require('./');

/** @name nodber.count */
const fn = async (tableName, whereStr = '1=1') => {
	const result = await nodber.proxy(tableName, {whereStr});
	return result[0].count;
};

module.exports = fn;
