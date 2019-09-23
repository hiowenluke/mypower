
const my = require('..');

/** @name my.count */
const fn = async (tableName, whereStr = '1=1') => {
	const result = await my.proxy(tableName, {whereStr});
	return result[0].cnt;
};

module.exports = fn;
