
const shell = require('shelljs');
const config = require('../__config');
const nodber = require('..');

/** @name nodber.renameDatabase */
const fn = async (oldDatabaseName, newDatabaseName) => {

	if (await nodber.isDatabaseExists(newDatabaseName)) {
		return false;
	}

	const {username, password} = config;
	const cmd = `
		mysql -u${username} -p${password} -e "create database if not exists ${newDatabaseName} character set utf8mb4 collate utf8mb4_unicode_ci" && 
		list_table=$(mysql -u${username} -p${password} -Nse "select table_name from information_schema.TABLES where TABLE_SCHEMA='${oldDatabaseName}'") && 
		for table in $list_table; do mysql -u${username} -p${password} -e "rename table ${oldDatabaseName}.$table to ${newDatabaseName}.$table"; done &&
		mysql -u${username} -p${password} -e "drop database ${oldDatabaseName}"		
	`;
	shell.exec(cmd, {silent: true});

	return true;
};

module.exports = fn;
