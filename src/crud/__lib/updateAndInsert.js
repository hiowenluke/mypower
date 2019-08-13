
const lib = require('./');

/** @name nodber.updateAndInsert */
const fn = async (sqlTemplate, table, data) => {

	if (!data || typeof data !== 'object') {
		throw new Error('Require data argument, and it must be an object like {id, username}.');
	}

	const tableName = table;
	const {nameParams, valueParams, setParams} = await lib.fieldParams.genAllByTableName(tableName);

	let sql = sqlTemplate
		.replace(/{tableName}/ig, tableName)
		.replace(/{nameParams}/i, nameParams)
		.replace(/{valueParams}/i, valueParams)
		.replace(/{setParams}/i, setParams)
	;

	const result = await nodber.exec(sql, {replacements: data});
	return result;
};

module.exports = fn;
