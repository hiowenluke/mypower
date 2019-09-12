
const nodber = require('../../');

/** @name nodber.getFieldTypeStr */
const fn = async (tableName, fieldName) => {

	const {fieldType, length, m, d} = await nodber.getFieldType(tableName, fieldName);
	if (!fieldType) return;

	let result = '';

	if (length) {
		// varchar(100), tinytext(255)
		result = `${fieldType}(${length})`;
	}
	else
	if (m) {
		if (d) {
			// float(6, 2), double(22, 2), decimal(10, 2)
			result = `${fieldType}(${m}, ${d})`;
		}
		else {
			// tinyint(3), smallint(5), mediumint(7), int(10), bigint(19)
			result = `${fieldType}(${m})`;
		}
	}
	else {
		result = `${fieldType}`; // text
	}

	return result;
};

module.exports = fn;
