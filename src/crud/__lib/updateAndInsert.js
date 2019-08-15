
const utils = require('../../__utils');
const lib = require('./');

/** @name lib.updateAndInsert */
const fn = async (sqlTemplate, table, data) => {

	if (!data || typeof data !== 'object') {
		throw new Error('Require data argument, and it must be an object like {id, username}.');
	}

	const tableName = table;
	const {nameParams, valueParams, setParams} = await lib.fieldParams.genAllByTableName(tableName);

	const sql = utils.sqlTemplate(sqlTemplate, {tableName, nameParams, valueParams, setParams});
	const result = await nodber.exec(sql, {replacements: data});
	return result;
};

module.exports = fn;
