
const shell = require('shelljs');
const config = require('../__config');
const my = require('..');
const myCli = require('mysql-cli-exec');

/** @name my.renameDatabase */
const fn = async (oldDatabaseName, newDatabaseName) => {

	if (await my.isDatabaseExists(newDatabaseName)) {
		return false;
	}

	const sqlCreateDatabase = my.sqls('createDatabase', newDatabaseName);
	myCli.exec(sqlCreateDatabase, config);

	const {username, password} = config;
	const cmd = `
		list_table=$(mysql -u${username} -p${password} -Nse "select table_name from information_schema.TABLES where TABLE_SCHEMA='${oldDatabaseName}'") && 
		for table in $list_table; do mysql -u${username} -p${password} -e "rename table ${oldDatabaseName}.$table to ${newDatabaseName}.$table"; done
	`;

	const result = shell.exec(cmd, {silent: true});

	const sqlDropDatabase = my.sqls('dropDatabase', oldDatabaseName);
	myCli.exec(sqlDropDatabase, config);

	return result.code !== 0 ? console.log(result.stderr.replace(/\\n/g, '\n')) : true;
};

module.exports = fn;
