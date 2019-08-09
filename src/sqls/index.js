
const nodber = require('../');
const config = require('../config');

const getRawSql = (purpose) => {
	if (!sqls) {
		sqls = require('./dialect/' + dialect + '.js');
	}

	return sqls[purpose];
};

const getNamesFromArgs = (sql, args) => {
	let databaseName;
	let tableName;

	const isNeedDatabaseName = /{databasename}/i.test(sql);
	const isNeedTableName = /{tablename}/i.test(sql);

	if (isNeedDatabaseName) {
		databaseName = args.shift(); // The first argument always is database name

		if (isNeedTableName) {
			tableName = args.shift();
		}
		else {
			// do nothing
		}
	}
	else {
		if (isNeedTableName) {
			tableName = args.shift(); // The first argument always is table name
		}
		else {
			// do nothing
		}
	}

	return {databaseName, tableName};
};

/** @name nodber.sqls */
const fn = (purpose, tablename) => {
	const dialect = config.dialect;
	let sql = nodber.sqls[dialect][purpose];
	if (!sql) return '';

	const {databaseName, tableName} = getNamesFromArgs(sql, args);

	if (databaseName) {
		sql = sql.replace(/{databasename}/ig, databaseName);
	}

	if (tableName) {
		sql = sql.replace(/{tablename}/ig, tableName);
	}

	}

	return sql;
};

module.exports = fn;
