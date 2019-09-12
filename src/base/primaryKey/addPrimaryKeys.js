
const nodber = require('../../');

/** @name nodber.addPrimaryKeys */
const fn = async (tableName, primaryKeys) => {
	if (Array.isArray(primaryKeys)) {
		primaryKeys = primaryKeys.join(',');
	}

	const result = await nodber.proxy(tableName, {primaryKeys});
	return result;
};

module.exports = fn;
