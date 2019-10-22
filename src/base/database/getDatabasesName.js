
// The alias of my.showDatabases

const my = require('../..');

/** @name my.getDatabasesName */
const fn = async (serverConfig) => {
	return await my.showDatabases(serverConfig);
};

module.exports = fn;
