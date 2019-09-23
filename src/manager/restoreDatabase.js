
const shell = require('shelljs');
const config = require('../__config');
const my = require('..');

/** @name my.restoreDatabase */
const fn = async (databaseName, infile, {host, toHost, unzip = false} = {}) => {

	const {username, password} = config;
	const optionToHost = host || toHost ? '-h ' + (host || toHost) : '';
	const gunzip = unzip || /\.gz$/.test(infile) ? `gunzip < ${infile} | ` : '';

	const sqlCreateDatabase = my.sqls('createDatabase', {databaseName});

	const cmd = {
		one: `
			${gunzip} 
			mysql ${optionToHost} -u${username} -p${password} -e "${sqlCreateDatabase}" && 
			mysql ${optionToHost} -u${username} -p${password} --database=${databaseName} < ${infile.replace(/\\.gz$/, '')}
		`,

		all: `
			${gunzip} 
			mysql ${optionToHost} -u${username} -p${password} < ${infile.replace(/\\.gz$/, '')}
		`
	};

	const type = databaseName === 'all' ? 'all' : 'one';

	const result = shell.exec(cmd[type], {silent: true});
	return result.code !== 0 ? console.log(result.stderr.replace(/\\n/g, '\n')) : true;
};

module.exports = fn;
