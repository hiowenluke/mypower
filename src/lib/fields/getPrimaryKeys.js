
const nodber = require('../../');

/** @name nodber.getPrimaryKeys */
const fn = async (tableName) => {
	if (!tableName) return [];

	const sql = nodber.sqls('getPrimaryKeys', tableName);

	const result = await nodber.exec(sql);
	return !result ? [] : result.map(o => o.primaryKey);
};

module.exports = fn;
