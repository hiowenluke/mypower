
const nodber = require('../../');

/** @name nodber.getAutoIdName */
const fn = async (tableName) => {
	const databaseName = await nodber.getSelectedDatabase();
	const sql = nodber.sqls('getAutoIdName', databaseName, tableName);

	const result = await nodber.exec(sql);
	return result[0] ? result[0].autoIdName : null;
};

module.exports = fn;
