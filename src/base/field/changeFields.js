
const my = require('../..');

/** @name my.changeFields */
const fn = async (tableName, newFieldDefs) => {
	let result;

	for (let i = 0; i < newFieldDefs.length; i ++) {
		const {name, newDef} = newFieldDefs[i];
		const oldFieldName = name;

		const newFieldName = newDef.name || oldFieldName;
		const newFieldTypeDef = newDef;
		result = await my.updateField(tableName, oldFieldName, newFieldName, newFieldTypeDef);
	}

	return result;
};

module.exports = fn;
