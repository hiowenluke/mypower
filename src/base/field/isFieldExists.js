
const nodber = require('../..');

/** @name nodber.isFieldExists */
const fn = async (tableName, fieldName) => {
	let fieldNames = await nodber.getFieldNames(tableName);
	if (!fieldNames) return;

	return fieldNames.indexOf(fieldName) >= 0;
};

module.exports = fn;
