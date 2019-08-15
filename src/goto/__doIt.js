
const nodber = require('../');
const utils = require('../__utils');

const sqlTemplate = `select * from {tableName} where {idName} = (select {idName} from {tableName} where {idName} {operation} {idValue} order by {idName} {direction} limit 1)`;

const fn = async (tableName, idName, idValue, direction) => {

	// ('users', 1, 'desc')
	if (typeof idName === 'number') {
		direction = idValue;
		idValue = idName;
		idName = 'id';
	}

	const operation = direction === 'desc' ? '<' : '>';
	const sql = utils.sqlTemplate(sqlTemplate, {tableName, idName, idValue, direction, operation});
	const result = await nodber.exec(sql);

	return result[0];
};

module.exports = fn;
