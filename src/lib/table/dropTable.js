
/** @name nodber.dropTable */
const fn = async (tableName) => {
	const nodber = global.nodber;

	if (!(await nodber.isTableExists(tableName))) {
		return false;
	}

	await nodber.proxy(tableName);
	return await nodber.isSuccessful();
};

module.exports = fn;
