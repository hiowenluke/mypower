
const nodber = require('../');

/** @name nodber.lib.isTableFieldExists */
const fn = async (tableName, fieldName) => {
	let fieldNames = await nodber.lib.getTableFieldNames(tableName);
	if (!fieldNames) return;

	return fieldNames.indexOf(fieldName) >= 0;
};

module.exports = fn;
