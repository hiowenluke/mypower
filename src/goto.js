
const nodber = require('./');
const utils = require('./__utils');

const sqlTemplate = `select * from {tableName} where {idName} = (select idName from {tableName} where {idName} < {idValue} order by {idName} {direction} limit 1)`;

const doIt = async (tableName, idName, idValue, direction) => {

	// ('users', 1, 'desc')
	if (typeof idName === 'number') {
		direction = idValue;
		idValue = idName;
		idName = 'id';
	}

	const sql = utils.sqlTemplate(sqlTemplate, {tableName, idName, idValue, direction});
	const result = await nodber.exec(sql);

	return result[0];
};

/** @name nodber.goto */
const me = {

	/** @name nodber.previous */
	async previous(...args) {
		return await doIt(...args, 'desc');
	},

	/** @name nodber.next */
	async next(...args) {
		return await doIt(...args, 'next');
	}
};

module.exports = me;
