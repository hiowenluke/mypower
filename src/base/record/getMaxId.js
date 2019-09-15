
const nodber = require('../..');

/** @name nodber.getMaxId */
const fn = async (tableName, idName = 'id') => {
	return await nodber.getMaxFieldValue(tableName, idName);
};

module.exports = fn;
