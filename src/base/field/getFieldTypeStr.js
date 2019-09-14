
const nodber = require('../../');

/** @name nodber.getFieldTypeStr */
const fn = async (tableName, fieldName) => {

	const fieldTypeDef = await nodber.getFieldType(tableName, fieldName);
	const result = await nodber.convertFieldTypeDefToStr(fieldTypeDef);
	return result;
};

module.exports = fn;
