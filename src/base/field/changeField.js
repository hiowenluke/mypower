
const my = require('../..');

/** @name my.changeField */
const fn = async (tableName, oldFieldName, newFieldName, newFieldTypeDef) => {
	const newFieldTypeStr = !newFieldTypeDef ?
			await my.getFieldTypeStr(tableName, oldFieldName) :
			my.convertFieldTypeDefToStr(newFieldTypeDef)
	;

	const result = await my.proxy(tableName, {oldFieldName, newFieldName, newFieldTypeStr});
	return result;
};

module.exports = fn;
