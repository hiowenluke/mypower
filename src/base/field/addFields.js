
const my = require('../..');

/** @name my.addFields */
const fn = async (tableName, fieldDefinitions) => {
	let result;

	for (let i = 0; i < fieldDefinitions.length; i ++) {
		const def = fieldDefinitions[i];
		const fieldName = def.name;
		const fieldTypeDef = def;
		result = await my.addField(tableName, fieldName, fieldTypeDef);
	}

	return result;
};

module.exports = fn;
