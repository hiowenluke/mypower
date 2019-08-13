
const nodber = require('../../');

/** @name nodber.getPrimaryKeys */
const fn = async (tableName) => {
	if (!tableName) return [];

	const databaseName = await nodber.getSelectedDatabase();
	const sql = nodber.sqls('getPrimaryKeys', databaseName, tableName);

	const result = await nodber.exec(sql);
	return !result ? [] : result.map(o => o.primaryKey);
};

module.exports = fn;
