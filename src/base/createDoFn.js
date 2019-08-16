
const nodber = require('../../');
const caller = require('caller');

/** @name nodber.lib.createDoFn */
const fn = (fieldName, isFromResultRoot) => {
	const pathToCaller = caller();

	return async (...args) => {
		let result = await nodber.proxy(...args, pathToCaller);
		if (fieldName) {
			result = isFromResultRoot ? result[fieldName] : result[0][fieldName];
		}
		return result;
	};
};

module.exports = fn;