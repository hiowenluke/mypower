
const nodber = require('..');

/** @name nodber.cloneDatabaseStructure */
const fn = async (sourceDatabaseName, targetDatabaseName) => {
	return await nodber.cloneDatabase(sourceDatabaseName, targetDatabaseName, {isStructureOnly: true});
};

module.exports = fn;