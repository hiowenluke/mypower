
const nodber = require('../..');
const config = require('../../__config');
const shell = require('shelljs');
const myCli = require('mysql-cli-exec');

/** @name nodber.isDatabaseExists */
const fn = async (databaseName, serverConfig) => {
	const sql = await nodber.sqls('isDatabaseExists', databaseName);
	let result;

	// Do it on current server
	if (!serverConfig) {
		result = await nodber.exec(sql);
	}
	else {
		// Do it on another server
		result = myCli.exec(sql, serverConfig);
	}

	return result.length === 1;
};

module.exports = fn;
