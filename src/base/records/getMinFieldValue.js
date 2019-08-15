
const nodber = require('../../');

/** @name nodber.getMinFieldValue */
const fn = async (tableName, fieldName, whereStr = '1=1') => {
	const result = await nodber.proxy(tableName, {fieldName, whereStr});
	return result[0].minval;
};

module.exports = fn;
