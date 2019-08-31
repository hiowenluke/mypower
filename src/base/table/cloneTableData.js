
const nodber = require('../../');

/** @name nodber.cloneTableData */
const fn = async (newTableName, oldTableName, newDatabaseName, oldDatabaseName) => {
	if (!newDatabaseName) {
		newDatabaseName = await nodber.getSelectedDatabase();
		oldDatabaseName = newDatabaseName;
	}

	const result = await nodber.proxy({newTableName, oldTableName, newDatabaseName, oldDatabaseName});
	return result;
};

module.exports = fn;
