
const nodber = require('../..');
const myCli = require('mysql-cli-exec');

/** @name nodber.getWarningCount */
const fn = async (serverConfig) => {
	const sql = nodber.sqls('getWarningCount');
	let result;

	// Do it on current server
	if (!serverConfig) {
		result = await nodber.exec(sql);
	}
	else {
		// Do it on another server
		result = myCli.exec(sql, serverConfig);
	}

	return result[0].warningCount;
};

module.exports = fn;
