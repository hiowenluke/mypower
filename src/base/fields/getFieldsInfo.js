
const nodber = require('../../');

/** @name nodber.getFieldsInfo */
const fn = async (tableName) => {
	const databaseName = await nodber.getSelectedDatabase();
	const result = await nodber.proxy(databaseName, tableName);
	return nodber.lowerCaseFieldNames(result);
};

module.exports = fn;
