
const my = require('../..');
const myCli = require('mysql-cli-exec');

/** @name my.showDatabases */
const fn = async (serverConfig) => {
	const sql = my.sqls('showDatabases');
	let result;

	// Do it on current server
	if (!serverConfig) {
		result = await my.exec(sql);
	}
	else {
		// Do it on another server
		result = myCli.exec(sql, serverConfig);
	}

	// Only return the field "Database"
	return result.map(item => item.Database);
};

module.exports = fn;
