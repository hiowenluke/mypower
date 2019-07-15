
const nodber = require('./');

/** @name nodber.goto */
const me = {
	async previous(query, sqlStr) {
		// The previous record id is less than the current record, so it is "lt"
		return await this._goto(query, sqlStr, '$lt');
	},

	async next(query, sqlStr) {
		// The next record id is greater than the current record, so it is "gt"
		return await this._goto(query, sqlStr, '$gt');
	},

	async _goto(query, sqlStr, op) {
		query.pageno = 1;
		query.pagesize = 1;

		sqlStr += ' ' + nodber.paging.getPagingStr(query);

		// If it is looking for the previous record, use reverse order
		op === '$lt' && (sqlStr = sqlStr.replace(' OFFSET ', ' DESC OFFSET '));

		return await nodber.exec(sqlStr, query.data);
	}
};

module.exports = me;
