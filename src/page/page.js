
const nodber = require('../');
const lib = require('./__lib');

// args = {table, fields, where, isGroup, group, order, pageNumber, pageSize, tableAs, data}
/** @name nodber.page */
const fn = async (args) => {
	let {pageNumber, pageSize} = args;

	// Calc limit and offset for select
	let {limit, offset} = lib.calcLimitByPageInfo(pageNumber, pageSize);

	args.limit = limit;
	args.offset = offset;
	args.isGetSqlStrOnly = true;

	if (!args.order) {
		args.order = await lib.getDefaultOrderFiled(args.table);
	}

	const {sqlMain, sqlClauses} = await nodber.select(args);

	args.sqlMain = sqlMain;
	args.sqlClauses = sqlClauses;

	const result = await nodber.pageBySql(args);
	return result;
};

module.exports = fn;
