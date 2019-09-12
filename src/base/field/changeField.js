
const nodber = require('../../');

/** @name nodber.changeField */
const fn = async (tableName, oldFieldName, newFieldName, newFieldTypeStr) => {
	newFieldTypeStr = newFieldTypeStr || await nodber.getFieldTypeStr(tableName, oldFieldName);

	const result = await nodber.proxy(tableName, {oldFieldName, newFieldName, newFieldType: newFieldTypeStr});
	return result;
};

module.exports = fn;
