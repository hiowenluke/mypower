
const nodber = require('../../');

/** @name nodber.cloneTable */
const fn = async (newTableName, oldTableName, newDatabaseName, oldDatabaseName) => {
	await nodber.cloneTableStructure(newTableName, oldTableName, newDatabaseName, oldDatabaseName);

	const fromTableName = oldTableName;
	const fromDatabaseName = oldDatabaseName;
	const toTableName = newTableName;
	const toDatabaseName = newDatabaseName;
	await nodber.copyTableData(fromTableName, toTableName, fromDatabaseName, toDatabaseName);
};

module.exports = fn;
