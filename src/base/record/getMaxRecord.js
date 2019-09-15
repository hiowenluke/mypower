
const nodber = require('../..');

/** @name nodber.getMaxRecord */
const fn = async (tableName, fieldName, whereStr) => {
	fieldName = fieldName || await nodber.getPrimaryKey(tableName);
	whereStr = whereStr || '1=1';

	// If there is no primary key, try using id as the primary key
	if (!fieldName) {
		if (await nodber.isFieldExists(tableName, 'id')) {
			fieldName = 'id';
		}
		else {
			throw new Error(`Require a fieldname or specify a primary key`);
		}
	}

	const result = await nodber.proxy(tableName, {fieldName, whereStr});
	return !result ? null : nodber.lowerCaseFieldNames(result[0]);
};

module.exports = fn;
