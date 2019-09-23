
const nodber = require('../..');
const myCli = require('mysql-cli-exec');

/** @name nodber.showDatabases */
const fn = async (serverConfig) => {
	const sql = await nodber.sqls('showDatabases');
	let result;

	// Do it on current server
	if (!serverConfig) {
		result = await nodber.exec(sql);
	}
	else {
		// Do it on another server
		result = myCli.exec(sql, serverConfig);
	}

	return result;
};

module.exports = fn;
