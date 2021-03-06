
const my = require('../..');

/** @name my.dropTables */
const fn = async (tableNames) => {
	if (!tableNames) return;

	if (typeof tableNames === 'string') {
		tableNames = [tableNames];
	}

	let result;
	for (let i = 0; i < tableNames.length; i ++) {
		const tableName = tableNames[i];
		result = await my.dropTable(tableName);
	}

	return result;
};

module.exports = fn;
