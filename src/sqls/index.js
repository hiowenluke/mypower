
const nodber = require('../');
const config = require('../config');

/** @name nodber.sqls */
const fn = (purpose, tablename) => {
	const dialect = config.dialect;
	let sql = nodber.sqls[dialect][purpose];
	if (!sql) return '';

	sql = sql.replace(/{tablename}/ig, tablename);

	if (dialect === 'mysql') {
		sql = sql.replace(/{database}/ig, config.database)
	}

	return sql;
};

module.exports = fn;
