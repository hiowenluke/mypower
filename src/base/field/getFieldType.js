
const nodber = require('../../');

/** @name nodber.getFieldType */
const fn = async (tableName, fieldName) => {

	const result = await nodber.proxy(tableName, {fieldName});
	return result ? result[0] : null;
};

module.exports = fn;
