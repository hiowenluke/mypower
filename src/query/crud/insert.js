
const lib = require('./__lib');

const sqlTemplate = `insert into {tableName} ({nameParams}) values({valueParams})`;

/** @name nodber.insert */
const fn = async (tableName, data) => {
	await lib.updateAndInsert(sqlTemplate, tableName, data);

	const idName = await nodber.getPrimaryKey(tableName);
	const maxId = await nodber.getMaxId(tableName, idName);

	return maxId;
};

module.exports = fn;
