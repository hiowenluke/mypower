
const nodber = require('../../');

/** @name nodber.getFieldNames */
const fn = async (tableName) => {
	const result = await nodber.proxy(tableName);
	return result.map(obj => obj.fieldname);
};

module.exports = fn;
