
const handleRecord = (record) => {
	if (!record) return record;

	Object.keys(record).forEach(fieldName => {
		const lowerCase = fieldName.toLowerCase();
		if (lowerCase === fieldName) return;

		// Add a lowercase name field
		record[lowerCase] = record[fieldName];

		// Remove the original name
		delete record[fieldName];
	});

	return record;
};

/** @name nodber.lib.lowerCaseFieldNames */
const fn = (records) => {
	if (!records || typeof records !== 'object') return records;

	if (Array.isArray(records)) {
		return records.map(record => handleRecord(record));
	}
	else {
		return handleRecord(records);
	}
};

module.exports = fn;
