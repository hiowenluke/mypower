
const my = require('..');
const caller = require('caller');

/** @name my.lib.createDoFn */
const fn = (fieldName, isFromResultRoot) => {
	const pathToCaller = caller();

	return async (...args) => {
		let result = await my.proxy(...args, pathToCaller);
		if (result && fieldName) {
			result = isFromResultRoot ? result[fieldName] : result[0] ? result[0][fieldName] : null;
		}
		return result;
	};
};

module.exports = fn;
