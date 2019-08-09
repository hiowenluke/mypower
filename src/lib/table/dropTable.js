
/** @name nodber.dropTable */
const fn = async (tableName) => {
	if (!(await global.nodber.isTableExists(tableName))) {
		return false;
	}

	await global.nodber.proxy(tableName);
	return await global.nodber.isSuccessful();
};

module.exports = fn;
