
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

	return result;
};

module.exports = fn;
