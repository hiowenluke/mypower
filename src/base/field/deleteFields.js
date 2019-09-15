
const nodber = require('../..');

/** @name nodber.deleteFields */
const fn = async (tableName, fieldNamesArr) => {
	let result;

	for (let i = 0; i < fieldNamesArr.length; i ++) {
		const fieldName = fieldNamesArr[i];
		result = await nodber.deleteField(tableName, fieldName);
	}

	return result;
};

module.exports = fn;
