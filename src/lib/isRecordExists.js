
const nodber = require('../');

/** @name nodber.lib.isRecordExists */
const fn = async (tablename, whereStr = '1=1') => {
	const result = await nodber.count(`select count(*) as count from ${tablename} where ${whereStr}`);
	return !!result;
};

module.exports = fn;
