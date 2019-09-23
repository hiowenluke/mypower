
const my = require('../..');

/** @name my.getFieldNamesWithoutAutoId */
const fn = async (tableName) => {
	const fieldNames = await my.getFieldNames(tableName);
	const autoIdName = await my.getAutoIdName(tableName);
	return autoIdName ? fieldNames.filter(item => item !== autoIdName) : fieldNames;
};

module.exports = fn;
