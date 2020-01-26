
const lib = require('./__lib');
const my = require('../..');

const sqlTemplate = `insert into {tableName} ({nameParams}) values({valueParams})`;

/** @name my.insert */
const fn = async (tableName, data, isReturnNewId) => {
	await lib.updateAndInsert(sqlTemplate, tableName, data);

	if (isReturnNewId) {
		const idName = await my.getPrimaryKey(tableName);
		const newId = await my.getMaxId(tableName, idName);
		return newId;
	}
};

module.exports = fn;
