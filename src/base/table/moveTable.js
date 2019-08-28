
const nodber = require('../../');

/** @name nodber.moveTable */
const fn = async (fromDatabaseName, toDatabaseName, fromTableName, toTableName) => {
	toTableName = toTableName || fromTableName;

	const result = await nodber.proxy({
		from_databaseName: fromDatabaseName,
		to_databaseName: toDatabaseName,
		from_tableName: fromTableName,
		to_tableName: toTableName,
	});

	return result.warningStatus === 0;
};

module.exports = fn;
