
const nodber = require('../..');
const sequery = require('sequelize-raw-query');

/** @name nodber.recordsCount */
const fn = async (tableName, whereStr) => {
	if (typeof whereStr === 'object') {
		whereStr = sequery.getWhereConditions(whereStr);
	}

	return await nodber.count(tableName, whereStr);
};

module.exports = fn;
