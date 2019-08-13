
const sequery = require('sequelize-raw-query');
const nodber = require('../');

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
	select: `select {fieldNames} from {tableName} where {whereStr}`,
	delete: `delete from {tableName} where {whereStr}`,
	insert: `insert into {tableName} ({nameParams}) values({valueParams})`,
	update: `update {tableName} set {setParams} where {whereStr}`,

	async get(act, ...args) {
		let tableName, fieldNames, whereStr;

		// ({tableName, fieldNames, whereStr})
		if (args.length === 1 && typeof args[0] === "object") {
			({tableName, fieldNames, whereStr} = args[0]);
		}
		else {
			// (tableName, fieldNames, whereStr)
			tableName = args[0];

		}

		if (!fieldNames) {
			fieldNames = "*";
		}

		if (!whereStr) {
			whereStr = '1=1';
		}

		const originalFieldNames = await nodber.getFieldNames(tableName);
		const {nameParams, valueParams, setParams} = fieldParams.genAll(originalFieldNames);

		const sql = this[act]
			.replace(/{fieldNames}/ig, fieldNames)
			.replace(/{tableName}/ig, tableName)
			.replace(/{nameParams}/ig, nameParams)
			.replace(/{valueParams}/ig, valueParams)
			.replace(/{setParams}/ig, setParams)
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
		return await this.do('select', ...args);
	},

	async insert(...args) {
		return await this.do('insert', ...args);
	},

	async update(...args) {
		return await this.do('update', ...args);
	},

	async delete(...args) {
		return await this.do('delete', ...args);
	},

	async do(act, ...args) {
		const sql = await commands.get(act, ...args);
		const whereStr = getWhereStr(query, appendWhereStr);
		const result = await nodber.exec(sql + whereStr, {replacements: query.data});
		return result;
	}
};

module.exports = me;
