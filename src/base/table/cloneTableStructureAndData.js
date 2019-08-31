
const nodber = require('../../');

/** @name nodber.cloneTableStructureAndData */
const fn = async (newTableName, oldTableName, newDatabaseName, oldDatabaseName) => {
	await nodber.cloneTableStructure(newTableName, oldTableName, newDatabaseName, oldDatabaseName);
	await nodber.cloneTableData(newTableName, oldTableName, newDatabaseName, oldDatabaseName);
};

module.exports = fn;
