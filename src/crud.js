
const sequery = require('sequelize-raw-query');
const nodber = require('./');

const fieldParams = {
	genAll(fieldNames) {
		let arr = fieldNames;
		typeof arr === 'string' && (arr = arr.replace(/ /g, '').split(','));

		const nameParams = this.genNameParams(arr);
		const valueParams = this.genValueParams(arr);
		const setParams = this.genSetParams(arr);

		return {nameParams, valueParams, setParams};
	},

	genNameParams(fieldNames) {
		return fieldNames.join(',');
	},

	genValueParams(fieldNames) {
		return ':' + fieldNames.join(', :');
	},

	genSetParams(fieldNames) {
		return fieldNames.map(fieldName => fieldName + ' = :' + fieldName).join(', ');
	},

	createReplacements(fieldNames) {
		const obj = {};
		fieldNames.forEach(fieldName => {
			obj[fieldName] = null;
		});
		return obj;
	}
};

const commands = {
	select: `select * from {tableName}`,
	insert: `insert into {tableName} ({nameParams}) values({valueParams})`,
	update: `update {tableName} set {setParams}`,
	delete: `delete from {tableName}`,

	async get(query) {
		const {act, tablename} = query;

		const fieldNames = await nodber.lib.getTableFieldNames(tablename);
		const {nameParams, valueParams, setParams} = fieldParams.genAll(fieldNames);

		const sql = this[act]
			.replace(/{tableName}/g, tablename)
			.replace(/{nameParams}/g, nameParams)
			.replace(/{valueParams}/g, valueParams)
			.replace(/{setParams}/g, setParams)
		;

		return sql;
	}
};

const getWhereStr = (query, appendWhereStr) => {
	const {act, where} = query;
	if (act === 'insert') return '';

	const queryWhereStr = sequery.getWhereConditions(where);
	const whereStr = ' where ' + (queryWhereStr || '1=1') + ' and ' + (appendWhereStr || '1=1');

	return whereStr;
};

/** @name nodber.crud */
const me = {
	async select(...args) {
		return await this.do(...args);
	},

	async insert(...args) {
		return await this.do(...args);
	},

	async update(...args) {
		return await this.do(...args);
	},

	async delete(...args) {
		return await this.do(...args);
	},

	async do(query, appendWhereStr) {
		const sql = await commands.get(query);
		const whereStr = getWhereStr(query, appendWhereStr);
		const result = await nodber.exec(sql + whereStr, {replacements: query.data});
		return result;
	}
};

module.exports = me;
