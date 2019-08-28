
const _ = require('lodash');
const nodber = require('..');
const config = require('../__config');

let sqls;
let dialect;

const getRawSql = (purpose) => {
	if (!sqls) {
		sqls = require('./dialect/' + dialect + '.js');
	}

	return sqls[purpose];
};

const getNamesFromArgs = async (purpose, sql, args) => {
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
			//		nodber.createDatabase(databaseName)
			const isForDatabase = /database/i.test(purpose);
			if (isForDatabase) {

				// Fetch database name from the first argument
				databaseName = args.shift();
			}
			else {
				// For table or field, e.g.:
				//		nodber.isTableExists(tableName)

				// Use the selected database name
				const sql = sqls['getSelectedDatabase'];
				const result = await nodber.exec(sql);
				databaseName = result[0].databaseName;
			}
		}

		const isRequireTableName = /{tableName}/i.test(sql);
		if (isRequireTableName) {
			tableName = args.shift(); // The first argument always is table name
		}
		else {
			// do nothing
		}
	}

	return {databaseName, tableName};
};


// Two forms:
// 		nodber.sqls('createTable', table, {fields: {...}})
// 		nodber.sqls('createTable', {table: 'users', xxx: 'xxx'})

/** @name nodber.sqls */
const fn = async (purpose, ...args) => {
	dialect = config.dialect;

	let sql = getRawSql(purpose);
	if (!sql) return '';

	// Fetch the database name and table name
	const {databaseName, tableName} = await getNamesFromArgs(purpose, sql, args);
	if (databaseName) {
		sql = sql.replace(/{databaseName}/ig, databaseName);
	}

	if (tableName) {
		sql = sql.replace(/{tableName}/ig, tableName);
	}

	// Fetch the other arguments from options, e.g.:
	//		nodber.sqls('createTable', table, {fields: {...}})
	const options = args[0];
	if (_.isPlainObject(options)) {
		Object.keys(options).forEach(key => {
			const reg = new RegExp('{' + key + '}', 'ig');

			// {fields} => some string
			sql = sql.replace(reg, options[key]);
		});
	}

	return sql;
};

module.exports = fn;
