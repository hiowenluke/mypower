
const my = require('../..');

/** @name my.isFieldExists */
const fn = async (tableName, fieldName) => {
	let fieldNames = await my.getFieldNames(tableName);
	if (!fieldNames) return;

	return fieldNames.indexOf(fieldName) >= 0;
};

module.exports = fn;
