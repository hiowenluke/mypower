
const my = require('../..');

/** @name my.deleteFields */
const fn = async (tableName, fieldNamesArr) => {
	let result;

	for (let i = 0; i < fieldNamesArr.length; i ++) {
		let fieldName = fieldNamesArr[i];

		// {name: 'xxx', type: 'varchar', length: 100}
		if (typeof fieldName === 'object') {
			fieldName = fieldName.name;
		}

		result = await my.deleteField(tableName, fieldName);
	}

	return result;
};

module.exports = fn;
