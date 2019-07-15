
const nodber = require('../');

/** @name nodber.lib.getMaxRecord */
const fn = async (tablename, fieldname, whereStr = '1=1') => {

	fieldname = fieldname || await nodber.lib.getPrimaryKey(tablename);

	// If there is no primary key, try using id as the primary key
	if (!fieldname) {
		if (await nodber.lib.isTableFieldExists(tablename, 'id')) {
			fieldname = 'id';
		}
		else {
			throw new Error(`Require a fieldname or specify a primary key for tablename`);
		}
	}

	const result = await nodber.exec(`select * from ${tablename} where ${whereStr} and ${fieldname} = (select max(${fieldname}) from ${tablename} where ${whereStr})`);
	return !result ? null : nodber.lib.lowerCaseFieldNames(result[0]);
};

module.exports = fn;
