
const nodber = require('../');

/** @name nodber.lib.getTableFieldNames */
const fn = async (tableName) => {
	const sql = nodber.sqls('getTableFieldNames', tableName);
	const result = await nodber.exec(sql);
	if (!result || !result[0]) return;

	const fieldNames = result.map(obj => obj.fieldname);
	return nodber.lib.lowerCaseRecords(fieldNames);
};

module.exports = fn;
