
const nodber = require('../');
const config = require('../config');

// Because there may be multiple primary keys, sort by ordinal_position
const sqls = {
	mssql: `SELECT column_name as primaryKey FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE WHERE OBJECTPROPERTY(OBJECT_ID(constraint_name), 'IsPrimaryKey') = 1 AND table_name = {tablename} order by ordinal_position`,
	mysql: `SELECT column_name as primaryKey FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE WHERE table_name={tablename} AND CONSTRAINT_SCHEMA={database} AND constraint_name='PRIMARY' order by ordinal_position`,
};

/** @name nodber.lib.getPrimaryKeys */
const fn = async (tablename) => {
	if (!tablename) return [];

	let sql = sqls[config.dialect];
	sql = sql
		.replace('{tablename}', tablename)
		.replace('{database}', config.database) // for mysql
	;

	const result = await nodber.exec(sql);
	return !result ? [] : result.map(o => o.primaryKey);
};

module.exports = fn;
