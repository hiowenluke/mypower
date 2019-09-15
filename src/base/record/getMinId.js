
const nodber = require('../..');

/** @name nodber.getMinId */
const fn = async (tableName, idName = 'id') => {
	return await nodber.getMinFieldValue(tableName, idName);
};

module.exports = fn;
