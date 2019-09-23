
const my = require('../..');
const myCli = require('mysql-cli-exec');

/** @name my.getWarningCount */
const fn = async (serverConfig) => {
	const sql = my.sqls('getWarningCount');
	let result;

	// Do it on current server
	if (!serverConfig) {
		result = await my.exec(sql);
	}
	else {
		// Do it on another server
		result = myCli.exec(sql, serverConfig);
	}

	return result[0].warningCount;
};

module.exports = fn;
