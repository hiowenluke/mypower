
const nodber = require('../');

/** @name nodber.lib.isRecordExists */
const fn = async (tableName, whereStr = '1=1') => {
	const result = await nodber.count(`select count(*) as count from ${tableName} where ${whereStr}`);
	return !!result;
};

module.exports = fn;
