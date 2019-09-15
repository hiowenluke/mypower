
const shell = require('shelljs');
const config = require('../__config');
const nodber = require('..');

/** @name nodber.restoreDatabase */
const fn = async (databaseName, infile, {host, unzip = false} = {}) => {

	const {username, password} = config;
	const optionHost = host ? '-h ' + host : '';
	const gunzip = unzip || /\.gz$/.test(infile) ? `gunzip < ${infile} | ` : '';

	const cmd = {
		one: `
			${gunzip} 
			mysql ${optionHost} -u${username} -p${password} -e "create database if not exists ${databaseName} character set utf8mb4 collate utf8mb4_unicode_ci" && 
			mysql ${optionHost} -u${username} -p${password} --database=${databaseName} < ${infile.replace(/\\.gz$/, '')}
		`,

		all: `
			${gunzip} 
			mysql ${optionHost} -u${username} -p${password} < ${infile.replace(/\\.gz$/, '')}
		`
	};

	const type = databaseName === 'all' ? 'all' : 'one';
	shell.exec(cmd[type], {silent: true});

	return true;
};

module.exports = fn;
