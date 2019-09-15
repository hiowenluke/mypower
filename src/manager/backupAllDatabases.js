
const nodber = require('..');

/** @name nodber.backupAllDatabases */
const fn = async (...args) => {
	return await nodber.backupDatabase('all', ...args);
};

module.exports = fn;
