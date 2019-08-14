
const nodber = require('../../');

/** @name lib.getDefaultOrderFiled */
const fn = async (tableName) => {
	const primaryKey = await nodber.getPrimaryKey(tableName);

	if (!primaryKey) {
		throw new Error('Require order argument for paging');
	}

	const orderField = primaryKey;
	return orderField;
};

module.exports = fn;
