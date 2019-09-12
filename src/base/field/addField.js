
const nodber = require('../../');

/** @name nodber.addField */
const fn = async (tableName, fieldName, fieldTypeStr) => {
	const result = await nodber.proxy(tableName, {fieldName, fieldTypeStr});
	return result;
};

module.exports = fn;
