
const nodber = require('../..');

/** @name nodber.recordsCount */
const fn = async (tableName, whereStr) => {
	return await nodber.count(tableName, whereStr);
};

module.exports = fn;
