
const nodber = require('../');

/** @name nodber.lib.getMaxFieldValue */
const fn = async (tablename, fieldname, whereStr = '1=1') => {
	const result = await nodber.exec(`select max(${fieldname}) as maxval from ${tablename} where ${whereStr}`);
	return !result || !result[0] ? null : result[0].maxval;
};

module.exports = fn;
