
const nodber = require('../..');

/** @name nodber.changeField */
const fn = async (tableName, oldFieldName, newFieldName, newFieldTypeDef) => {
	const newFieldTypeStr = !newFieldTypeDef ?
			await nodber.getFieldTypeStr(tableName, oldFieldName) :
			nodber.convertFieldTypeDefToStr(newFieldTypeDef)
	;

	const result = await nodber.proxy(tableName, {oldFieldName, newFieldName, newFieldTypeStr});
	return result;
};

module.exports = fn;
