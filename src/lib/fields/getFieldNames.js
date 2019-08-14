
const nodber = require('../../');

/** @name nodber.getFieldNames */
const fn = async (tableName) => {
	const databaseName = await nodber.getSelectedDatabase();
	const sql = nodber.sqls('getFieldNames', databaseName, tableName);

	const result = await nodber.exec(sql);
	const fieldNames = result.map(obj => obj.fieldname);
	return nodber.lowerCaseRecords(fieldNames);
};

module.exports = fn;
