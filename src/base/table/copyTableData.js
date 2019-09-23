
const my = require('../..');

/** @name my.copyTableData */
const fn = async (fromTableName, toTableName, fromDatabaseName, toDatabaseName) => {
	if (!fromDatabaseName) {
		fromDatabaseName = await my.getSelectedDatabase();
		toDatabaseName = fromDatabaseName;
	}

	const result = await my.proxy({fromTableName, toTableName, fromDatabaseName, toDatabaseName});
	return result;
};

module.exports = fn;
