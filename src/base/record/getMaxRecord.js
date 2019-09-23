
const my = require('../..');

/** @name my.getMaxRecord */
const fn = async (tableName, fieldName, whereStr) => {
	fieldName = fieldName || await my.getPrimaryKey(tableName);
	whereStr = whereStr || '1=1';

	// If there is no primary key, try using id as the primary key
	if (!fieldName) {
		if (await my.isFieldExists(tableName, 'id')) {
			fieldName = 'id';
		}
		else {
			throw new Error(`Require a fieldname or specify a primary key`);
		}
	}

	const result = await my.proxy(tableName, {fieldName, whereStr});
	return !result ? null : my.lowerCaseFieldNames(result[0]);
};

module.exports = fn;
