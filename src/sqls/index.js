
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

	const isNeedDatabaseName = /{database}/i.test(sql);
	const isNeedTableName = /{table}/i.test(sql);

	if (typeof args[0] === 'object') {
		const options = args[0];
		databaseName = options.database;
		tableName = options.table;
	}
	else {
		if (isNeedDatabaseName) {
			databaseName = args.shift(); // The first argument always is databaseName name

			if (isNeedTableName) {
				tableName = args.shift();
			}
			else {
				// do nothing
			}
		}
		else {
			if (isNeedTableName) {
				tableName = args.shift(); // The first argument always is tableName name
			}
			else {
				// do nothing
			}
		}
	}

	return {databaseName, tableName};
};

// Three forms:
// 		nodber.sqls('createTable', database, table, {xxx})
// 		nodber.sqls('createTable', {database: 'test', table: 'users', xxx: 'xxx'})

/** @name nodber.sqls */
const fn = (purpose, ...args) => {
	dialect = config.dialect;

	let sql = getRawSql(purpose);
	if (!sql) return '';

	const {databaseName, tableName} = getNamesFromArgs(sql, args);

	if (databaseName) {
		sql = sql.replace(/{database}/ig, databaseName);
	}

	if (tableName) {
		sql = sql.replace(/{table}/ig, tableName);
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
