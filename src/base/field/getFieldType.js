
const my = require('../..');

/** @name my.getFieldType */
const fn = async (tableName, fieldName) => {
	const result = await my.proxy(tableName, {fieldName});

	// {type, length, m, d}
	return result ? result[0] : null;
};

module.exports = fn;
