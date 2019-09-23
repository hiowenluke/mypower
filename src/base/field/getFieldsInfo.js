
const my = require('../..');

/** @name my.getFieldsInfo */
const fn = async (tableName) => {
	const result = await my.proxy(tableName);
	return my.lowerCaseFieldNames(result);
};

module.exports = fn;
