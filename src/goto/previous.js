
const doIt = require('./__doIt');

/** @name nodber.previous */
const fn = async(...args) => {
	return await doIt(...args, 'desc');
};

module.exports = fn;

