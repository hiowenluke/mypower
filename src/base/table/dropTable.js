
const nodber = require('../../');

/** @name nodber.dropTable */
const fn = async (tableName) => {
	if (!(await nodber.isTableExists(tableName))) {
		return false;
	}

	const result = await nodber.proxy(tableName);
	return result.warningStatus === 0;
};

module.exports = fn;
