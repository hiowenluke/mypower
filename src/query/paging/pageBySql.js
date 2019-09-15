
const kdo = require('kdo');
const sequery = require('sequelize-raw-query');

const nodber = require('../..');
const lib = require('./__lib');

const paging = {
	getLimitStr({order, limit, offset, pageNumber, pageSize, tableAs}) {
		if (!limit) {
			({limit, offset} = lib.calcLimitByPageInfo(pageNumber, pageSize));
		}

		const limitStr = sequery.getLimitClause({order, limit, offset}, tableAs);
		return limitStr;
	},

	async appendPageInfo(result = {}, pageNumber, pageSize) {
		const recordCount = result.count || 0;
		const pageCount = parseInt(recordCount / pageSize) + (recordCount % pageSize ? 1 : 0);

		result.pageSize = pageSize;
		result.pageCount = pageCount;
		result.pageNumber = pageNumber;

		return {pageSize, pageCount, pageNumber, ...result};
	}
};

const flow = {
	async fixOrder({sqlMain, order}) {

		// If no sort field is specified, the primary key name of the primary table
		// (for example, billid, goodsid) is used as the sorting basis (default positive order)
		if (!order) {
			const tableName = nodber.getTableNameFromSql(sqlMain);
			order = await lib.getDefaultOrderFiled(tableName);
			this.setArgs({order});
		}
	},

	async getRows({sqlMain, sqlClauses, order, pageNumber, pageSize, tableAs, data}) {
		let limitStr = '';

		if (!sqlClauses) {
			limitStr = paging.getLimitStr({order, pageNumber, pageSize, tableAs});
		}
		else {
			limitStr = sqlClauses;
		}

		const rows = await nodber.exec(sqlMain + limitStr, data);
		this.setArgs({rows});
	},

	async getCount({sqlMain, data}) {
		let sqlCount = `select count(*) as count from (${sqlMain}) m`;

		sqlCount = sqlCount.replace(/{([a-zA-Z0-9_]+)}/g, (match, capture) => {
			return data[capture];
		});

		const result = await nodber.exec(sqlCount, data);
		const count = result[0].count;

		this.setArgs({count});
	},

	done({rows, count, pageNumber, pageSize}) {
		const result = {count, rows};
		return paging.appendPageInfo(result, pageNumber, pageSize);
	}
};

/** @name nodber.pageBySql */
const fn = async ({sql, sqlMain, sqlClauses, order, limit, offset, pageNumber, pageSize, tableAs, data}) => {
	if (!sqlMain) sqlMain = sql;

	// {
	//		pageSize,
	//		pageCount,
	//		pageNumber,

	//		count,
	//		rows: [
	//			{...},
	//		]
	// }
	return await kdo.do(flow, {sqlMain, sqlClauses, order, limit, offset, pageNumber, pageSize, tableAs, data});
};

module.exports = fn;
