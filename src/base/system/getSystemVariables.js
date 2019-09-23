
const nodber = require('../..');
const myCli = require('mysql-cli-exec');

/** @name nodber.getSystemVariables */
const fn = async (variableName, serverConfig) => {
	variableName = variableName ? `like "${variableName}"` : '';

	const sql = nodber.sqls('getSystemVariables', {variableName});
	let result;

	// Do it on current server
	if (!serverConfig) {
		result = await nodber.exec(sql);
	}
	else {
		// Do it on another server
		result = myCli.exec(sql, serverConfig);
	}

	return result;
};

module.exports = fn;
