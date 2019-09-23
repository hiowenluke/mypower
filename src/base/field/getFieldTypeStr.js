
const my = require('../..');

/** @name my.getFieldTypeStr */
const fn = async (tableName, fieldName) => {
	const fieldTypeDef = await my.getFieldType(tableName, fieldName);
	const result = await my.convertFieldTypeDefToStr(fieldTypeDef);

	// 'varchar(100)', 'int', 'float(10, 2)'
	return result;
};

module.exports = fn;
