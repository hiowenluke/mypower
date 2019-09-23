
const my = require('../..');

/** @name my.changeFieldType */
const fn = async (tableName, fieldName, newTypeDef) => {
	return await my.changeField(tableName, fieldName, fieldName, newTypeDef);
};

module.exports = fn;
