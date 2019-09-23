
const doIt = require('./__doIt');

/** @name my.next */
const fn = async(...args) => {
	return await doIt(...args, 'asc');
};

module.exports = fn;

