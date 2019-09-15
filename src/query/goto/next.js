
const doIt = require('./__doIt');

/** @name nodber.next */
const fn = async(...args) => {
	return await doIt(...args, 'asc');
};

module.exports = fn;

