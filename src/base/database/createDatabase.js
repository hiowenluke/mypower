
const my = require('../..');
const myCli = require('mysql-cli-exec');

/** @name my.createDatabase */
const fn = async (databaseName, serverConfig) => {
	if (await my.isDatabaseExists(databaseName, serverConfig)) {
		return false;
	}

	// Do it on current server
	if (!serverConfig) {
		const result = await my.proxy(databaseName);
		return result.warningStatus === 0;
	}
	else {
		// Do it on another server
		const sql = my.sqls('createDatabase', databaseName);
		myCli.exec(sql, serverConfig);

		const sql1 = my.sqls('isDatabaseExists', databaseName);
		const result = myCli.exec(sql1, serverConfig);
		return !!result;
	}
};

module.exports = fn;
