
// The alias of my.showDatabases

/** @name my.getDatabasesName */
const fn = async (serverConfig) => {
	return await my.showDatabases(serverConfig);
};

module.exports = fn;
