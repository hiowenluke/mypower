
const my = require('../..');

/** @name my.getMaxId */
const fn = async (tableName, idName = 'id') => {
	return await my.getMaxFieldValue(tableName, idName);
};

module.exports = fn;
