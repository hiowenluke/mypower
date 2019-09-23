
const my = require('../..');

/** @name my.getMinFieldValue */
const fn = async (tableName, fieldName, whereStr = '1=1') => {
	const result = await my.proxy(tableName, {fieldName, whereStr});
	return result[0].minval;
};

module.exports = fn;
