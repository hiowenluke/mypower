
const nodber = require('../../');

/** @name nodber.getMaxRecord */
const fn = async (tableName, fieldName, whereStr = '1=1') => {
	fieldName = fieldName || await nodber.getPrimaryKey(tableName);

	// If there is no primary key, try using id as the primary key
	if (!fieldName) {
		if (await nodber.isTableFieldExists(tableName, 'id')) {
			fieldName = 'id';
		}
		else {
			throw new Error(`Require a fieldname or specify a primary key for tableName`);
		}
	}

	const result = await nodber.exec(`select * from ${tableName} where ${whereStr} and ${fieldName} = (select max(${fieldName}) from ${tableName} where ${whereStr})`);
	return !result ? null : nodber.lowerCaseFieldNames(result[0]);
};

module.exports = fn;
