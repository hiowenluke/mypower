
const my = require('../..');

/** @name my.cloneTableStructure */
const fn = async (newTableName, oldTableName, newDatabaseName, oldDatabaseName) => {
	if (!newDatabaseName) {
		newDatabaseName = await my.getSelectedDatabase();
		oldDatabaseName = newDatabaseName;
	}

	const result = await my.proxy({newTableName, oldTableName, newDatabaseName, oldDatabaseName});
	return result;
};

module.exports = fn;
