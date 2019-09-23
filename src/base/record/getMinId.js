
const my = require('../..');

/** @name my.getMinId */
const fn = async (tableName, idName = 'id') => {
	return await my.getMinFieldValue(tableName, idName);
};

module.exports = fn;
