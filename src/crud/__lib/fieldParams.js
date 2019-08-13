
const me = {
	genAll(fieldNames) {
		let arr = fieldNames;
		typeof arr === 'string' && (arr = arr.replace(/ /g, '').split(','));

		const nameParams = this.genNameParams(arr);
		const valueParams = this.genValueParams(arr);
		const setParams = this.genSetParams(arr);

		return {nameParams, valueParams, setParams};
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
