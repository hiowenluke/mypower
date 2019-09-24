
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
		const isRequireDatabaseName = /{databaseName}/i.test(sql);
		if (isRequireDatabaseName) {

			// For database, e.g.:
			//		my.createDatabase(databaseName)
			const isForDatabase = /database/i.test(purpose);
			if (isForDatabase) {

				// Fetch database name from the first argument
				databaseName = args.shift();
			}
			else {
				// For table, field or record, e.g.:
				// 		my.isTableExists 		=> my.proxy(databaseName, tableName);
				// 		my.addField				=> my.proxy(tableName, {fieldName, fieldTypeStr});

				// If the last argument is options, then the count is args.length - 1
				const count = typeof args[args.length - 1] === 'object' ? args.length - 1 : args.length;

				// There are at least two arguments, then the first is database name
				if (count >= 2) {
					databaseName = args.shift();
				}
				else {
					// Only one argument, means there is no database name, then use the current database name
					databaseName = config.database;
				}
			}

			// The database name may be is undefined, e.g.:
			// 		my.isTableExists 	=> my.proxy(databaseName, tableName);
			if (!databaseName) {
				databaseName = config.database;
			}
		}

		const isRequireTableName = /{tableName}/i.test(sql);
		if (isRequireTableName) {

			// The first argument always is table name
			tableName = args.shift();
		}
		else {
			// do nothing
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
