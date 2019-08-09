
const nodber = require('../../');

/** @name nodber.getFieldNames */
const fn = async (tableName) => {
	const sql = nodber.sqls('getFieldNames', tableName);
	const result = await nodber.exec(sql);
	if (!result || !result[0]) return;

	const fieldNames = result.map(obj => obj.fieldname);
	return nodber.lowerCaseRecords(fieldNames);
};

module.exports = fn;
