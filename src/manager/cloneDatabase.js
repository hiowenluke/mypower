
const shell = require('shelljs');
const config = require('../__config');
const my = require('..');

/** @name my.cloneDatabase */
const fn = async (fromDatabaseName, toDatabaseName, {isForce, isStructureOnly, host, fromHost, toHost} = {}) => {

	if (await my.isDatabaseExists(toDatabaseName, toHost)) {
		if (!isForce) {
			return false;
		}
		else {
			await my.dropDatabase(toDatabaseName, toHost);
		}
	}

	const {username, password} = config;
	const option_d = isStructureOnly ? '-d' : '';
	const option_D = isStructureOnly ? '-D' : '';
	const optionFromHost = fromHost ? '-h ' + fromHost : '';
	const optionToHost = toHost || host ? '-h ' + (toHost || host) : '';

	const sqlCreateDatabase = my.sqls('createDatabase', toDatabaseName);

	const cmd = `
		mysql ${optionToHost} -u${username} -p${password} -e "${sqlCreateDatabase}" &&
		mysqldump ${optionFromHost} -u${username} -p${password} ${option_d} ${fromDatabaseName} | 
		mysql ${optionToHost} -u${username} -p${password} ${option_D} ${toDatabaseName}
	`;

	const result = shell.exec(cmd, {silent: true});
	return result.code !== 0 ? console.log(result.stderr.replace(/\\n/g, '\n')) : true;
};

module.exports = fn;
