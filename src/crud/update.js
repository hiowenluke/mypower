
const lib = require('./__lib');
const sequery = require('sequelize-raw-query');

const sqlTemplate = `update {tableName} set {setParams} where {whereStr}`;

/** @name nodber.update */
const fn = async (tableName, data, where) => {
	let thisSqlTemplate = sqlTemplate;

	if (where) {
		if (typeof where === 'object') {
			where = sequery.getWhereConditions(where);
		}
		else {
			// do nothing
		}
	}
	else {
		where = '1=1';
	}

	thisSqlTemplate = thisSqlTemplate.replace(/{whereStr}/i, where);

	const result = await lib.updateAndInsert(thisSqlTemplate, tableName, data);
	return result;
};

module.exports = fn;
