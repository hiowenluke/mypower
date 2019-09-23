
const my = require('../..');

/** @name my.getFieldNames */
const fn = async (tableName) => {
	const result = await my.proxy(tableName);
	return result.map(obj => obj.fieldname);
};

module.exports = fn;
