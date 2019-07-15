
const nodber = require('../');

/** @name nodber.lib.getTableFieldNames */
const fn = async (tablename) => {
	const sql = `select column_name as fieldname from information_schema.columns where table_name = '${tablename}'`;
	const result = await nodber.exec(sql);
	if (!result || !result[0]) return;

	const fieldNames = result.map(obj => obj.fieldname);
	return nodber.lib.lowerCaseRecords(fieldNames);
};

module.exports = fn;
