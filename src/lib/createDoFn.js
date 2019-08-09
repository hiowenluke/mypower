
const nodber = require('../../');
const caller = require('caller');

/** @name nodber.lib.createDoFn */
const fn = () => {
	const pathToCaller = caller();

	return async (...args) => {
		return await nodber.proxy(...args, pathToCaller);
	};
};

module.exports = fn;
