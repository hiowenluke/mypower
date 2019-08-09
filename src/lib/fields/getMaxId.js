
const nodber = require('../../');

/** @name nodber.getMaxId */
const fn = async (tableName) => {
	return await nodber.getMaxFieldValue(tableName, 'id');
};

module.exports = fn;
