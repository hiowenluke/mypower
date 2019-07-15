
const sequery = require('sequelize-raw-query');
const nodber = require('./');

/** @name nodber.paging */
const me = {
	pageno: 0,
	pagesize: 0,

	async do(sqlStr, sqlCount, query) {
		sqlStr += ' ' + this.getPagingStr(query);

		const records = await nodber.exec(sqlStr, {replacements: query.data});
		const count = await nodber.count(sqlCount, query);
		let result = {count, rows: records};

		result = this.appendData(result);
		return result;
	},

	calcOffsetLimit(pageno, pagesize) {
		let offset, limit;

		if (pageno) {
			pageno = pageno - 0;
			pagesize = pagesize ? pagesize - 0 : 10;

			offset = (pageno - 1) * pagesize;
			limit = pagesize;
		}

		this.pageno = pageno;
		this.pagesize = pagesize;

		return {offset, limit};
	},

	getPagingStr(query) {
		const {pageno, pagesize, mpkname} = query;
		const {offset, limit} = this.calcOffsetLimit(pageno, pagesize);
		if (!limit && !offset) return "";

		// Limit needs to be sorted, so set order here
		let order = query.order;

		// If no sort field is specified, the primary key name of the primary table
		// (for example, billid, goodsid) is used as the sorting basis (default positive order)
		if (!order || !order.length) {
			order = mpkname;
		}

		// Note that the alias tableAs is used here, and the constructed clause is as follows:
		// order by [m].[billid] offset 6 rows fetch next 3 rows only
		const options = {order, offset, limit};
		const tableAs = 'm';
		const limitStr = sequery.getLimitClause(options, tableAs);

		return limitStr;
	},

	async appendData(result = {}) {
		const pageno = this.pageno;
		const pagesize = this.pagesize;

		const count = result.count;
		const pages = parseInt(count / pagesize) + (count % pagesize ? 1 : 0);

		result.pagesize = pagesize;
		result.pages = pages;
		result.pageno = pageno;

		return {pagesize, pages, pageno, ...result};
	}
};

module.exports = me;
