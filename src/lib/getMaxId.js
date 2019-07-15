
const nodber = require('../');

/** @name nodber.lib.getMaxId */
const fn = async (tablename) => {
	return await nodber.lib.getMaxFieldValue(tablename, 'id');
};

module.exports = fn;
