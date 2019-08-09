
/** @name nodber.createDatabase */
const fn = async (databaseName) => {
	if (await global.nodber.isDatabaseExists(databaseName)) {
		return false;
	}

	await global.nodber.proxy(databaseName);
	return await global.nodber.isSuccessful();
};

module.exports = fn;
