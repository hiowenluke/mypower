
const nodber = require('../..');

/** @name nodber.deleteField */
const fn = async (tableName, fieldName) => {
	const result = await nodber.proxy(tableName, {fieldName});
	return result;
};

module.exports = fn;
