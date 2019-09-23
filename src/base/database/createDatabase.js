
const nodber = require('../..');
const myCli = require('mysql-cli-exec');

/** @name nodber.createDatabase */
const fn = async (databaseName, serverConfig) => {

	if (await nodber.isDatabaseExists(databaseName, serverConfig)) {
		return false;
	}

	// Do it on current server
	if (!serverConfig) {
		const result = await nodber.proxy(databaseName);
		return result.warningStatus === 0;
	}
	else {
		// Do it on another server
		const sql = await nodber.sqls('createDatabase', databaseName);
		myCli.exec(sql, serverConfig);
	}
};

module.exports = fn;
