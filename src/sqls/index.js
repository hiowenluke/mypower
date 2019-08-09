
const _ = require('lodash');
const config = require('../config');

let sqls;
let dialect;

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

// nodber.sqls('xxx', databaseName, tableName, {xxx})
/** @name nodber.sqls */
const fn = (purpose, ...args) => {
	dialect = config.dialect;

	let sql = getRawSql(purpose);
	if (!sql) return '';

	const {databaseName, tableName} = getNamesFromArgs(sql, args);

	if (databaseName) {
		sql = sql.replace(/{databasename}/ig, databaseName);
	}

	if (tableName) {
		sql = sql.replace(/{tablename}/ig, tableName);
	}

	const options = args[0];
	if (_.isPlainObject(options)) {
		Object.keys(options).forEach(key => {
			const reg = new RegExp('{' + key + '}', 'ig');
			sql = sql.replace(reg, options[key]);
		});
	}

	return sql;
};

module.exports = fn;
