
const utils = require('../../__utils');
const lib = require('./');

/** @name lib.updateAndInsert */
const fn = async (sqlTemplate, table, data) => {
	const tableName = table;
	const {nameParams, valueParams, setParams} = await lib.fieldParams.genAllByTableName(tableName, data);

	let sql = utils.sqlTemplate(sqlTemplate, {tableName, nameParams, valueParams, setParams});

	// Replace ":xxx" with data.xxx for unicode xxx,
	// otherwise, sequelize will occur an error if the xxx included unicode character.
	sql = utils.sqlReplacement(sql, data);

	const result = await nodber.exec(sql);
	return result;
};

module.exports = fn;
