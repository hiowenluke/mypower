
const _ = require('lodash');
const my = require('..');
const config = require('../__config');

let sqls;
let dialect;

const getRawSql = (purpose) => {
	if (!sqls) {
		sqls = require('./dialect/' + dialect + '.js');
	}

	return sqls[purpose];
};

const getNamesFromArgs = (purpose, sql, args) => {
	let databaseName;
	let tableName;

	if (typeof args[0] === 'object') {
		const options = args[0];
		databaseName = options.database;
		tableName = options.table;
	}
	else {
		// Five forms:
		// 		my.proxy({fieldName, whereStr}) // count === 0
		// 		my.proxy(databaseName) // count === 1
		// 		my.proxy(tableName) // count === 1
		// 		my.proxy(tableName, {fieldName, whereStr}) // count === 1
		// 		my.proxy(databaseName, tableName, {fieldName, whereStr}) // count === 2

		// The value of count:
		//		0	no database name and table name
		//		2	the first argument is database name
		//		1	the first argument is database name if it is for database, otherwise it is table name
		const count = typeof args[args.length - 1] === 'object' ? args.length - 1 : args.length;

		if (count === 0) {
			// do nothing
		}

		if (count === 1) {
			const isForDatabase = /database/i.test(purpose);
			const arg = args.shift();

			if (isForDatabase) {
				databaseName = arg;
			}
			else {
				tableName = arg;
			}
		}

		if (count === 2) {
			databaseName = args.shift();
			tableName = args.shift();
		}

		const isRequireDatabaseName = /{databaseName}/i.test(sql);
		if (isRequireDatabaseName && !databaseName) {
			databaseName = config.database;
		}

		const isRequireTableName = /{tableName}/i.test(sql);
		if (isRequireTableName && !tableName) {
			throw new Error('Require table name');
		}
	}

	return {databaseName, tableName};
};

const parseParamNamesFromSql = (sql) => {

	// ["{new_tableName}", "{old_tableName}"]
	const params = sql.match(/{[a-zA-Z0-9_]*?}/g);

	// ["new_tableName", "old_tableName"]
	return params.map(item => item.replace(/[{}]/g, ''));
};

const getAvailableValue = (options, key) => {
	let value = options[key];
	if (typeof value !== 'undefined') return value;

	// "new_tableName" => "newTableName"
	const newKey = key.replace(/_([a-z])/g, (match, capture) => {
		return capture.toUpperCase();
	});

	return options[newKey];
};

// Two forms:
// 		my.sqls('createTable', table, {fields: {...}})
// 		my.sqls('createTable', {table: 'users', xxx: 'xxx'})

/** @name my.sqls */
const fn = (purpose, ...args) => {
	dialect = config.dialect;

	let sql = getRawSql(purpose);
	if (!sql) return '';

	// Fetch the database name and table name
	const {databaseName, tableName} = getNamesFromArgs(purpose, sql, args);
	if (databaseName) {
		sql = sql.replace(/{databaseName}/ig, databaseName);
	}

	if (tableName) {
		sql = sql.replace(/{tableName}/ig, tableName);
	}

	// Fetch the other arguments from options, e.g.:
	//		my.sqls('createTable', table, {fields: {...}})
	const options = args[0];
	if (_.isPlainObject(options)) {

		// ["new_tableName", "old_tableName"]
		const paramNames = parseParamNamesFromSql(sql);
		paramNames.forEach(paramName => {

			// "new_tableName" => "newTableName"
			const value = getAvailableValue(options, paramName);

			// {fields} => some string
			const reg = new RegExp('{' + paramName + '}', 'ig');
			sql = sql.replace(reg, value);
		});
	}

	return sql;
};

module.exports = fn;
