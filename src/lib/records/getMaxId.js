
const nodber = require('../../');

/** @name nodber.getMaxId */
const fn = async (tableName, idName = 'id') => {
	const result = await nodber.proxy(tableName, {idName});
	return result[0].maxid;
};

module.exports = fn;
