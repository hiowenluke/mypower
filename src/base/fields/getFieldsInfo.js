
const nodber = require('../../');

/** @name nodber.getFieldsInfo */
const fn = async (tableName) => {
	const result = await nodber.proxy(tableName);
	return nodber.lowerCaseFieldNames(result);
};

module.exports = fn;
