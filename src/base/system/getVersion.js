
const my = require('../..');
const myCli = require('mysql-cli-exec');

/** @name my.getVersion */
const fn = async (serverConfig) => {
	let result;

	const sql = my.sqls('getVersion');

	// Do it on current server
	if (!serverConfig) {
		result = await my.exec(sql);
	}
	else {
		// Do it on another server
		result = myCli.exec(sql, serverConfig);
	}

	return result[0].version;
};

module.exports = fn;
