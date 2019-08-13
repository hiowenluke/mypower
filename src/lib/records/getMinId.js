
const nodber = require('../../');

/** @name nodber.getMinId */
const fn = async (tableName, idName = 'id') => {
	const result = await nodber.proxy(tableName, {idName});
	return result[0].minid;
};

module.exports = fn;
