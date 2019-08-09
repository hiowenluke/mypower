
/** @name nodber.isTableExists */
const fn = async (tableName, databaseName) => {
	databaseName = databaseName || await global.nodber.getSelectedDatabase();
	const result = await global.nodber.proxy(databaseName, tableName);
	return result.length > 0;
};

module.exports = fn;
