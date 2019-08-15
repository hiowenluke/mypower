
const sequery = require('sequelize-raw-query');
const utils = require('../__utils');

const sqlTemplate = `delete from {tableName} where {whereStr}`;

/** @name nodber.delete */
const fn = async (table, where) => {
	where = where || '1=1';

	if (typeof where === 'object') {
		where = sequery.getWhereConditions(where, table);
	}

	let sql = utils.sqlTemplate(sqlTemplate, {tableName: table, whereStr: where});
	await sequery.exec(sql);

	const result = await nodber.isSuccessful();
	return result;
};

module.exports = fn;
