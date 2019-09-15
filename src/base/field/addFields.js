
const nodber = require('../..');

/** @name nodber.addFields */
const fn = async (tableName, fieldDefinitions) => {
	let result;

	for (let i = 0; i < fieldDefinitions.length; i ++) {
		const def = fieldDefinitions[i];
		const fieldName = def.name;
		const fieldTypeDef = def;
		result = await nodber.addField(tableName, fieldName, fieldTypeDef);
	}

	return result;
};

module.exports = fn;
