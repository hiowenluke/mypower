
/** @name nodber.useDatabase */
const fn = async (databaseName) => {

	// Re-initialize the config
	const config = global.nodber.config.get();
	config.database = databaseName;
	global.nodber.init(config);

	// Change the database connection
	await global.nodber.proxy(databaseName);
};

module.exports = fn;
