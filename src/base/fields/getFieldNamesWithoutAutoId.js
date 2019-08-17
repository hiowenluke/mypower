
const nodber = require('../../');

/** @name nodber.getFieldNamesWithoutAutoId */
const fn = async (tableName) => {
	const fieldNames = await nodber.getFieldNames(tableName);
	const autoIdName = await nodber.getAutoIdName(tableName);
	return autoIdName ? fieldNames.filter(item => item !== autoIdName) : fieldNames;
};

module.exports = fn;
