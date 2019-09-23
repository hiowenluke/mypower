
const my = require('../..');
const sequery = require('sequelize-raw-query');

/** @name my.recordsCount */
const fn = async (tableName, whereStr) => {
	if (typeof whereStr === 'object') {
		whereStr = sequery.getWhereConditions(whereStr);
	}

	return await my.count(tableName, whereStr);
};

module.exports = fn;
