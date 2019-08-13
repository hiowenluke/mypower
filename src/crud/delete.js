
const sequery = require('sequelize-raw-query');
const lib = require('./__lib');

const sqlTemplate = `delete from {tableName} where {whereStr}`;

/** @name nodber.delete */
const fn = async (table, where) => {
	where = where || '1=1';

	if (typeof where === 'object') {
		where = sequery.getWhereConditions(where, table);
	}

	let sql = lib.useSqlTemplate(sqlTemplate, {tableName: table, whereStr: where});
	const result = await sequery.exec(sql);

	return result;
};

module.exports = fn;
