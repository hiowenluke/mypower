
const nodber = require('../..');

/** @name nodber.addFields */
const fn = async (tableName, fieldDefinitions) => {
	let result;

	for (let i = 0; i < fieldDefinitions.length; i ++) {
		const fieldDef = fieldDefinitions[i];
		result = await nodber.addField(tableName, fieldDef);
	}

	return result;
};

module.exports = fn;
