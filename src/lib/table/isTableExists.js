
/** @name nodber.isTableExists */
const fn = async (tableName, databaseName) => {
	const nodber = global.nodber;

	databaseName = databaseName || await nodber.getSelectedDatabase();
	const result = await nodber.proxy(databaseName, tableName);

	return result.length > 0;
};

module.exports = fn;
