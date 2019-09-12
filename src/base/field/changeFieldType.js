
const nodber = require('../../');

/** @name nodber.changeFieldType */
const fn = async (tableName, fieldName, newTypeStr) => {
	return await nodber.changeField(tableName, fieldName, fieldName, newTypeStr);
};

module.exports = fn;
