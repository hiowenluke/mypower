
const nodber = require('../../');

/** @name nodber.getMaxFieldValue */
const fn = async (tableName, fieldName, whereStr = '1=1') => {
	const result = await nodber.exec(`select max(${fieldName}) as maxval from ${tableName} where ${whereStr}`);
	return !result || !result[0] ? null : result[0].maxval;
};

module.exports = fn;
