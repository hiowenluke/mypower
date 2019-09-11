
const shell = require('shelljs');
const config = require('../../__config');

/** @name nodber.renameDatabase */
const fn = async (oldDatabaseName, newDatabaseName) => {

	if (await nodber.isDatabaseExists(newDatabaseName)) {
		return false;
	}

	const {username, password} = config;

	shell.exec(`
		mysql -u${username} -p${password} -e "create database if not exists ${newDatabaseName}" && 
		list_table=$(mysql -u${username} -p${password} -Nse "select table_name from information_schema.TABLES where TABLE_SCHEMA='${oldDatabaseName}'") && 
		for table in $list_table; do mysql -u${username} -p${password} -e "rename table ${oldDatabaseName}.$table to ${newDatabaseName}.$table"; done &&
		mysql -u${username} -p${password} -e "drop database ${oldDatabaseName}"		
	`, {silent: true});

	return true;
};

module.exports = fn;
