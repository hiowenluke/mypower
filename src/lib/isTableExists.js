
const nodber = require('../');

/** @name nodber.lib.isTableExists */
const fn = async (tablename) => {
	const sql = nodber.sqls('isTableExists', tablename);
	const result = await nodber.exec(sql);
	return !!(result && result[0]);
};

module.exports = fn;
