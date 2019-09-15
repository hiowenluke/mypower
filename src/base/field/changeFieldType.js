
const nodber = require('../..');

/** @name nodber.changeFieldType */
const fn = async (tableName, fieldName, newTypeDef) => {
	return await nodber.changeField(tableName, fieldName, fieldName, newTypeDef);
};

module.exports = fn;
