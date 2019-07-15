
const nodber = require('../');

/** @name nodber.lib.isTableFieldExists */
const fn = async (tablename, fieldname) => {
	let fieldNames = await nodber.lib.getTableFieldNames(tablename);
	if (!fieldNames) return;

	return fieldNames.indexOf(fieldname) >= 0;
};

module.exports = fn;
