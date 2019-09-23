
const my = require('..');

/** @name my.restoreAllDatabases */
const fn = async (...args) => {
	return my.restoreDatabase('all', ...args);
};

module.exports = fn;
