
const shell = require('shelljs');
const config = require('../__config');
const nodber = require('..');

/** @name nodber.backupDatabase */
const fn = async (databaseName, outfile, {host, zip = false} = {}) => {

	if (databaseName === 'all') {
		databaseName = '--all-databases';
	}
	else if (Array.isArray(databaseName)) {
		databaseName = '--databases ' + databaseName.join(' ');
	}
	else if (databaseName.indexOf(',') >= 0) {
		databaseName = '--databases ' + databaseName.replace(/,/g, ' ');
	}

	const {username, password} = config;
	const optionHost = host ? '-h ' + host : '';
	const gzip = zip || /\.gz$/.test(outfile) ? ' | gzip ' : '';

	const cmd = `
		mysqldump ${optionHost} -u${username} -p${password} ${databaseName} ${gzip} > ${outfile}
	`;

	const result = shell.exec(cmd, {silent: true});
	return result.code !== 0 ? console.log(result.stderr.replace(/\\n/g, '\n')) : true;
};

module.exports = fn;
