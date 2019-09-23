
const my = require('../..');

/** @name my.deleteField */
const fn = async (tableName, fieldName) => {
	const result = await my.proxy(tableName, {fieldName});
	return result;
};

module.exports = fn;
