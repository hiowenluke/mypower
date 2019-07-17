
const nodber = require('../');

/** @name nodber.lib.getTableFieldNames */
const fn = async (tablename) => {
	const sql = nodber.sqls('getTableFieldNames', tablename);
	const result = await nodber.exec(sql);
	if (!result || !result[0]) return;

	const fieldNames = result.map(obj => obj.fieldname);
	return nodber.lib.lowerCaseRecords(fieldNames);
};

module.exports = fn;
