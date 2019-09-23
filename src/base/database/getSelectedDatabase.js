
const my = require('../..');
const myCli = require('mysql-cli-exec');

/** @name my.getSelectedDatabase */
const fn = async (databaseName, serverConfig) => {
	const sql = my.sqls('getSelectedDatabase', databaseName);
	let result;

	// Do it on current server
	if (!serverConfig) {
		result = await my.exec(sql);
	}
	else {
		// Do it on another server
		result = myCli.exec(sql, serverConfig);
	}

	return result[0].databaseName;
};

module.exports = fn;
