
const nodber = require('../../');

/** @name nodber.recordsCount */
const fn = async (tableName, whereStr = '1=1') => {
	return await nodber.count(`select count(*) as count from ${tableName} where ${whereStr}`);
};

module.exports = fn;
