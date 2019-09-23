
const my = require('..');

/** @name my.backupAllDatabases */
const fn = async (...args) => {
	return await my.backupDatabase('all', ...args);
};

module.exports = fn;
