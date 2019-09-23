
const my = require('../..');

/** @name my.dropTable */
const fn = async (tableName) => {
	if (!(await my.isTableExists(tableName))) {
		return false;
	}

	const result = await my.proxy(tableName);
	return result.warningStatus === 0;
};

module.exports = fn;
