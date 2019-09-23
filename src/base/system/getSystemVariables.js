
const my = require('../..');
const myCli = require('mysql-cli-exec');

/** @name my.getSystemVariables */
const fn = async (variableName, serverConfig) => {
	variableName = variableName ? `like "${variableName}"` : '';

	const sql = my.sqls('getSystemVariables', {variableName});
	let result;

	// Do it on current server
	if (!serverConfig) {
		result = await my.exec(sql);
	}
	else {
		// Do it on another server
		result = myCli.exec(sql, serverConfig);
	}

	return result;
};

module.exports = fn;
