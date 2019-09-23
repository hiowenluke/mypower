
const nodber = require('..');

/** @name nodber.cloneDatabaseStructure */
const fn = async (fromDatabaseName, toDatabaseName) => {
	return await nodber.cloneDatabase(fromDatabaseName, toDatabaseName, {isStructureOnly: true});
};

module.exports = fn;
