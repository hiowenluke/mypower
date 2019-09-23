
const my = require('../../..');

/** @name lib.getDefaultOrderFiled */
const fn = async (tableName) => {
	const primaryKey = await my.getPrimaryKey(tableName);

	if (!primaryKey) {
		throw new Error('Require order argument for paging');
	}

	const orderField = primaryKey;
	return orderField;
};

module.exports = fn;
