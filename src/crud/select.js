
const sequery = require('sequelize-raw-query');
const lib = require('./__Lib');

const sqlTemplate = `select {fieldNames} from {tableName} where {whereStr}`;

const parseArgs = (args) => {
	let tableName, fieldNames, whereStr, isGroup, group, order, limit, offset;

	// ({table, fields, where, isGroup, group, order, limit, offset})
	if (typeof args[0] === 'object') {
		const arg = args[0];
		tableName = arg.table;
		fieldNames = arg.fields;
		whereStr = arg.where;
		({isGroup, group, order, limit, offset} = arg);

		({tableName, fieldNames, whereStr} = lib.fixArgs({tableName, fieldNames, whereStr}));
	}
	else {
		// (tableName, fieldNames, whereStr)
		({tableName, fieldNames, whereStr} = lib.parseArgs(...args));
	}

	return {tableName, fieldNames, whereStr, isGroup, group, order, limit, offset};
};

const getGroupClause = ({tableName, fieldNames, isGroup, group}) => {
	let groupClause;

	// ({table, fields, isGroup})
	if (isGroup) {
		if (!fieldNames) {
			throw new Error('Require fields argument for isGroup.');
		}
		groupClause = sequery.getGroupClause(fieldNames, tableName);
	}
	else {

		// ({table, fields, group})
		if (group) {
			if (!fieldNames) {
				throw new Error('Require fields argument for group.');
			}
			groupClause = sequery.getGroupClause(fieldNames, tableName);
		}
	}

	return groupClause;
};

const getOrderClause = ({order, limit, offset}) => {
	let orderClause;

	if (!order) {
		return;
	}

	// ({table, order, limit, offset})
	if (limit || offset) {

		// Let getLimitClause() to handle it
		return;
	}

	orderClause = sequery.getOrderClause(order);
	return orderClause;
};

const getLimitClause = ({order, limit, offset}) => {
	let limitClause;

	// ({table})
	if (!limit && !offset) {
		return;
	}

	// ({table, limit})
	if (!order) {
		throw new Error('Require order argument for limit.');
	}

	// ({table, order, offset})
	if (!limit && offset) {
		limit = 1;
	}

	// ({table, order, limit, offset})
	limitClause = sequery.getLimitClause({order, limit, offset});
	return limitClause;
};

/** @name nodber.select */
const fn = async (...args) => {
	const {tableName, fieldNames, whereStr, isGroup, group, order, limit, offset} = parseArgs(args);
	let groupClause, orderClause, limitClause;

	let sql = lib.useSqlTemplate(sqlTemplate, {tableName, fieldNames, whereStr});

	groupClause = getGroupClause({tableName, fieldNames, isGroup, group});
	orderClause = getOrderClause({order, limit, offset});
	limitClause = getLimitClause({order, limit, offset});

	groupClause && (sql += groupClause);
	orderClause && (sql += orderClause);
	limitClause && (sql += limitClause);

	const result = await sequery.exec(sql);
	return result;
};

module.exports = fn;
