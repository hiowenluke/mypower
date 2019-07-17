
const nodber = require('../');
const config = require('../config');

/** @name nodber.sqls */
const fn = (purpose, tablename) => {
	let sql = nodber.sqls[config.dialect][purpose];
	if (!sql) return '';

	sql = sql
		.replace('{tablename}', tablename)
		.replace('{database}', config.database) // for mysql
	;

	return sql;
};

module.exports = fn;
