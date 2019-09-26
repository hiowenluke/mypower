
const my = require('../..');
const myCli = require('mysql-cli-exec');

/** @name my.dropDatabase */
const fn = async (databaseName, serverConfig) => {
	if (!(await my.isDatabaseExists(databaseName, serverConfig))) {
		return false;
	}

	// Do it on current server
	if (!serverConfig) {
		const result = await my.proxy(databaseName);
		return result.warningStatus === 0;
	}
	else {
		// Do it on another server
		const sql = my.sqls('dropDatabase', databaseName);

		// Note that here we do it via cli, there is no warningStatus returned.
		myCli.exec(sql, serverConfig);

		// So we should check it via isDatabaseExists.
		const sql1 = my.sqls('isDatabaseExists', databaseName);
		const result = myCli.exec(sql1, serverConfig);
		return !result;
	}
};

module.exports = fn;
