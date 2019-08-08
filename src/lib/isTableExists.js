
const nodber = require('../');

/** @name nodber.lib.isTableExists */
const fn = async (tableName) => {
	const sql = nodber.sqls('isTableExists', tableName);
	const result = await nodber.exec(sql);
	return !!(result && result[0]);
};

module.exports = fn;
