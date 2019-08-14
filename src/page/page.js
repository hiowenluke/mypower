
const nodber = require('../');
const lib = require('./__lib');

// args = {tableName, fieldNames, whereStr, isGroup, group, order, pageNumber, pageSize, tableAs, data}
/** @name nodber.page */
const fn = async (args) => {
	let {pageNumber, pageSize} = args;

	// Calc limit and offset for select
	let {limit, offset} = lib.calcLimitByPageInfo(pageNumber, pageSize);

	args.limit = limit;
	args.offset = offset;
	args.isGetSqlStrOnly = true;

	const sqlStr = await nodber.select(args);
	const result = await nodber.pageBySql(sqlStr, args);

	return result;
};

module.exports = fn;
