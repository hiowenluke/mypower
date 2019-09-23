
const nodber = require('../..');
const myCli = require('mysql-cli-exec');

/** @name nodber.getVersion */
const fn = async (serverConfig) => {
	let result;

	const sql = nodber.sqls('getVersion');

	// Do it on current server
	if (!serverConfig) {
		result = await nodber.exec(sql);
	}
	else {
		// Do it on another server
		result = myCli.exec(sql, serverConfig);
	}

	return result[0].version;
};

module.exports = fn;
