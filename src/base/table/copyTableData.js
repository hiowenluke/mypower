
const nodber = require('../../');

/** @name nodber.copyTableData */
const fn = async (fromTableName, toTableName, fromDatabaseName, toDatabaseName) => {
	if (!fromDatabaseName) {
		fromDatabaseName = await nodber.getSelectedDatabase();
		toDatabaseName = fromDatabaseName;
	}

	const result = await nodber.proxy({fromTableName, toTableName, fromDatabaseName, toDatabaseName});
	return result;
};

module.exports = fn;
