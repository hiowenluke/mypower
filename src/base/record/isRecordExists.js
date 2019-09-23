
const my = require('../..');

/** @name my.isRecordExists */
const fn = async (tableName, whereStr = '1=1') => {
	const result = await my.recordsCount(tableName, whereStr);
	return !!result;
};

module.exports = fn;
