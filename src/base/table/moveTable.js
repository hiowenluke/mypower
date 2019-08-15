
const nodber = require('../../');

/** @name nodber.moveTable */
const fn = async (fromDbName, toDbName, tableName) => {
	const result = await nodber.proxy({from_databaseName: fromDbName, to_databaseName: toDbName, tableName});
	return result.warningStatus === 0;
};

module.exports = fn;
