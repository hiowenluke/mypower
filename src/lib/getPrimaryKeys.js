
const nodber = require('../');

/** @name nodber.lib.getPrimaryKeys */
const fn = async (tablename) => {
	if (!tablename) return [];

	const sql = nodber.sqls('getPrimaryKeys', tablename);

	const result = await nodber.exec(sql);
	return !result ? [] : result.map(o => o.primaryKey);
};

module.exports = fn;
