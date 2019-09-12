
const nodber = require('../../');

/** @name nodber.changeFieldName */
const fn = async (tableName, oldFieldName, newFieldName) => {
	return await nodber.changeField(tableName, oldFieldName, newFieldName);
};

module.exports = fn;
