
const nodber = require('../');

/** @name nodber.lib.getMaxId */
const fn = async (tableName) => {
	return await nodber.lib.getMaxFieldValue(tableName, 'id');
};

module.exports = fn;
