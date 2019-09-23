
const my = require('../../..');

/** @name lib.fieldParams */
const me = {
	genAll(fieldNames, data) {
		let arr = fieldNames;

		if (typeof arr === 'string') {
			arr = arr.replace(/ /g, '').split(',');
		}

		// Exclude the field names which are not in data.
		// For the update operation, it means that only the fields with values
		// in data are set, and no other fields are set, which is expected.
		if (data) {
			const onlyFields = Object.keys(data);
			arr = arr.filter(fieldName => onlyFields.indexOf(fieldName) >= 0);
		}

		const nameParams = this.genNameParams(arr);
		const valueParams = this.genValueParams(arr);
		const setParams = this.genSetParams(arr);

		return {nameParams, valueParams, setParams};
	},

	async genAllByTableName(tableName, data) {
		let fieldNames = await my.getFieldNamesWithoutAutoId(tableName);
		return this.genAll(fieldNames, data);
	},

	genNameParams(fieldNames) {
		return fieldNames.join(',');
	},

	genValueParams(fieldNames) {
		return ':' + fieldNames.join(', :');
	},

	genSetParams(fieldNames) {
		return fieldNames.map(fieldName => fieldName + ' = :' + fieldName).join(', ');
	},

	createReplacements(fieldNames) {
		const obj = {};
		fieldNames.forEach(fieldName => {
			obj[fieldName] = null;
		});
		return obj;
	}
};

module.exports = me;
