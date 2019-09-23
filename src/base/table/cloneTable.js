
const my = require('../..');

/** @name my.cloneTable */
const fn = async (newTableName, oldTableName, newDatabaseName, oldDatabaseName) => {
	await my.cloneTableStructure(newTableName, oldTableName, newDatabaseName, oldDatabaseName);

	const fromTableName = oldTableName;
	const fromDatabaseName = oldDatabaseName;
	const toTableName = newTableName;
	const toDatabaseName = newDatabaseName;
	await my.copyTableData(fromTableName, toTableName, fromDatabaseName, toDatabaseName);
};

module.exports = fn;
