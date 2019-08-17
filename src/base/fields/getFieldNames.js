
const nodber = require('../../');

/** @name nodber.getFieldNames */
const fn = async (tableName) => {
	const databaseName = await nodber.getSelectedDatabase();
	const sql = nodber.sqls('getFieldNames', databaseName, tableName);

	const result = await nodber.exec(sql);
	return result.map(obj => obj.fieldname);
};

module.exports = fn;
