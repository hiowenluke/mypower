
const my = require('..');

/** @name my.cloneDatabaseStructure */
const fn = async (fromDatabaseName, toDatabaseName) => {
	return await my.cloneDatabase(fromDatabaseName, toDatabaseName, {isStructureOnly: true});
};

module.exports = fn;
