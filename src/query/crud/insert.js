
const lib = require('./__lib');

const sqlTemplate = `insert into {tableName} ({nameParams}) values({valueParams})`;

/** @name my.insert */
const fn = async (tableName, data) => {
	await lib.updateAndInsert(sqlTemplate, tableName, data);

	const idName = await my.getPrimaryKey(tableName);
	const maxId = await my.getMaxId(tableName, idName);

	return maxId;
};

module.exports = fn;
