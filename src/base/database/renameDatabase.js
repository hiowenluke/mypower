
const shell = require('shelljs');
const config = require('../../__config');

/** @name nodber.renameDatabase */
const fn = async (oldName, newName) => {

	const {username, password} = config;
	shell.exec(`
		mysql -u${username} -p${password} -e "create database if not exists ${newName}" && 
		list_table=$(mysql -u${username} -p${password} -Nse "select table_name from information_schema.TABLES where TABLE_SCHEMA='${oldName}'") && 
		for table in $list_table; do mysql -u${username} -p${password} -e "rename table ${oldName}.$table to ${newName}.$table"; done
	`, {silent: true});
};

module.exports = fn;
