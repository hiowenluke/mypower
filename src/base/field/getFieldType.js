
const nodber = require('../..');

/** @name nodber.getFieldType */
const fn = async (tableName, fieldName) => {
	const result = await nodber.proxy(tableName, {fieldName});

	// {type, length, m, d}
	return result ? result[0] : null;
};

module.exports = fn;
