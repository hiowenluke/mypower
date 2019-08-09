
/** @name nodber.isDatabaseExists */
const fn = async (databaseName) => {
	const result = await global.nodber.proxy(databaseName);
	return result.length > 0;
};

module.exports = fn;
