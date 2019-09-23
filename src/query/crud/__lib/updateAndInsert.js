
const my = require('../../..');
const lib = require('.');

/** @name lib.updateAndInsert */
const fn = async (sqlTemplate, table, data) => {
	const tableName = table;
	const {nameParams, valueParams, setParams} = await lib.fieldParams.genAllByTableName(tableName, data);

	let sql = my.sqlTemplate(sqlTemplate, {tableName, nameParams, valueParams, setParams});

	// Replace ":xxx" with data.xxx for unicode xxx,
	// otherwise, sequelize will occur an error if the xxx included unicode character.
	sql = my.sqlReplacement(sql, data);

	const result = await my.exec(sql);
	return result;
};

module.exports = fn;
