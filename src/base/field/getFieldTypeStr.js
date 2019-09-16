
const nodber = require('../..');

/** @name nodber.getFieldTypeStr */
const fn = async (tableName, fieldName) => {
	const fieldTypeDef = await nodber.getFieldType(tableName, fieldName);
	const result = await nodber.convertFieldTypeDefToStr(fieldTypeDef);

	// 'varchar(100)', 'int', 'float(10, 2)'
	return result;
};

module.exports = fn;
