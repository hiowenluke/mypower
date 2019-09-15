
const nodber = require('..');

/** @name nodber.restoreAllDatabases */
const fn = async (...args) => {
	return nodber.restoreDatabase('all', ...args);
};

module.exports = fn;
