
const shell = require('shelljs');
const config = require('../__config');
const my = require('..');
const myCli = require('mysql-cli-exec');

/** @name my.restoreDatabase */
const fn = async (databaseName, infile, {host, toHost} = {}) => {

	const type = databaseName === 'all' ? 'all' : 'one';

	if (type === 'one') {
		const sql = my.sqls('createDatabase', databaseName);
		config.host = host || toHost || config.host;
		myCli.exec(sql, config);
	}

	const isZipFile = /\.gz$/.test(infile);
	const sqlFile = isZipFile ? infile.replace(/\.gz$/, '') : infile;
	const unzipToSqlFile = isZipFile ? `gzcat ${infile} > ${sqlFile}` : 'echo';
	const removeUnzippedSqlFile = isZipFile ? `rm -f ${sqlFile}` : 'echo';

	const {username, password} = config;
	const optionToHost = host || toHost ? '-h ' + (host || toHost) : '';

	const cmd = {
		one: `
			${unzipToSqlFile} &&
			mysql ${optionToHost} -u${username} -p${password} --database=${databaseName} < ${sqlFile} &&
			${removeUnzippedSqlFile}
		`,

		all: `
			${unzipToSqlFile} &&
			mysql ${optionToHost} -u${username} -p${password} < ${sqlFile} &&
			${removeUnzippedSqlFile}
		`
	};

	const result = shell.exec(cmd[type], {silent: true});
	return result.code !== 0 ? console.log(result.stderr.replace(/\\n/g, '\n')) : true;
};

module.exports = fn;
