
const my = require('../..');
const myCli = require('mysql-cli-exec');

/** @name my.isDatabaseExists */
const fn = async (databaseName, serverConfig) => {
	const sql = my.sqls('isDatabaseExists', databaseName);
	let result;

	// Do it on current server
	if (!serverConfig) {
		result = await my.exec(sql);
	}
	else {
		// Do it on another server
		result = myCli.exec(sql, serverConfig);
	}

	return result && result.length === 1;
};

module.exports = fn;
