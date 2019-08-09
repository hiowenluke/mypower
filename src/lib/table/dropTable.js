
const nodber = require('../../');

/** @name nodber.dropTable */
const fn = async (tableName) => {
	if (!(await nodber.isTableExists(tableName))) {
		return false;
	}

	await nodber.proxy(tableName);
	return await nodber.isSuccessful();
};

module.exports = fn;
