
const my = require('../..');

/** @name my.getMaxFieldValue */
const fn = async (tableName, fieldName, whereStr = '1=1') => {
	const result = await my.proxy(tableName, {fieldName, whereStr});
	return result[0].maxval;
};

module.exports = fn;
