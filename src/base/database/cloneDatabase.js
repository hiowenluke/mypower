
const shell = require('shelljs');
const config = require('../../__config');
const nodber = require('../../');

/** @name nodber.cloneDatabase */
const fn = async (sourceDatabaseName, targetDatabaseName, {isStructureOnly, host, fromHost, toHost} = {}) => {

	if (await nodber.isDatabaseExists(targetDatabaseName)) {
		return false;
	}

	await nodber.createDatabase(targetDatabaseName);

	const {username, password} = config;
	const option_d = isStructureOnly ? '-d' : '';
	const option_D = isStructureOnly ? '-D' : '';
	const optionFromHost = fromHost ? '-h ' + fromHost : '';
	const optionToHost = toHost || host ? '-h ' + (toHost || host) : '';

	shell.exec(`mysqldump ${optionFromHost} -u ${username} -p${password} ${option_d} ${sourceDatabaseName} | mysql ${optionToHost} -u ${username} -p${password} ${option_D} ${targetDatabaseName}`, {silent: true});

	return true;
};

module.exports = fn;
