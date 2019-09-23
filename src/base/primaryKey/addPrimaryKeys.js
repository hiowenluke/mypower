
const my = require('../..');

/** @name my.addPrimaryKeys */
const fn = async (tableName, primaryKeys) => {
	if (Array.isArray(primaryKeys)) {
		primaryKeys = primaryKeys.join(',');
	}

	const result = await my.proxy(tableName, {primaryKeys});
	return result;
};

module.exports = fn;
