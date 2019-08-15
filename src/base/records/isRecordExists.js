
const nodber = require('../../');

/** @name nodber.isRecordExists */
const fn = async (tableName, whereStr = '1=1') => {
	const result = await nodber.recordsCount(tableName, whereStr);
	return !!result;
};

module.exports = fn;
