
const lowerCaseArray = require('./lowerCaseArray');

const getKeys = (records, fieldNames) => {

	// Use it if you specify a field name to convert to lowercase.
	if (fieldNames) {
		if (typeof fieldNames === 'string') {

			// "field1, field2" => ["field1", "field2"]
			if (fieldNames.indexOf(',') >= 0) {
				fieldNames = fieldNames.replace(/ /g, '').split(',');
			}
			else {
				// "field1" => ["field1"]
				fieldNames = [fieldNames];
			}
		}

		return fieldNames;
	}

	// Convert all fields by default
	return Object.keys(records[0]);
};

/** @name my.lowerCaseRecords */
const fn = (records, fieldNames) => {
	if (!records || !Array.isArray(records)) return;

	// If records is an array, use lowerCaseArray()
	if (Array.isArray(records)) {
		return lowerCaseArray(records);
	}

	// Get the field name to be converted to lowercase (defaults to all fields)
	const keys = getKeys(records, fieldNames);

	records.forEach(record => {

		// The value of each field is converted to lowercase
		keys.forEach(key => {

			// Only process strings
			if (typeof record[key] !== 'string') return;
			record[key] = record[key].toLowerCase();
		})
	});

	return records;
};

module.exports = fn;
