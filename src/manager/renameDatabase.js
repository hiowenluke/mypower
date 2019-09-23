
const shell = require('shelljs');
const config = require('../__config');
const my = require('..');

/** @name my.renameDatabase */
const fn = async (oldDatabaseName, newDatabaseName) => {

	if (await my.isDatabaseExists(newDatabaseName)) {
		return false;
	}

	const {username, password} = config;
	const sqlCreateDatabase = my.sqls('createDatabase', newDatabaseName);
	const sqlDropDatabase = my.sqls('dropDatabase', oldDatabaseName);

	const cmd = `
		mysql -u${username} -p${password} -e "${sqlCreateDatabase}" && 
		list_table=$(mysql -u${username} -p${password} -Nse "select table_name from information_schema.TABLES where TABLE_SCHEMA='${oldDatabaseName}'") && 
		for table in $list_table; do mysql -u${username} -p${password} -e "rename table ${oldDatabaseName}.$table to ${newDatabaseName}.$table"; done &&
		mysql -u${username} -p${password} -e "${sqlDropDatabase}"		
	`;

	const result = shell.exec(cmd, {silent: true});
	return result.code !== 0 ? console.log(result.stderr.replace(/\\n/g, '\n')) : true;
};

module.exports = fn;
