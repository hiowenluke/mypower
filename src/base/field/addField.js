
const nodber = require('../../');

/** @name nodber.addField */
const fn = async (tableName, fieldName, fieldType) => {
	const result = await nodber.proxy(tableName, {fieldName, fieldType});
	return result;
};

module.exports = fn;
