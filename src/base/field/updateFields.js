
const my = require('../..');

/** @name my.updateFields */
const fn = async (...args) => {
	return await my.changeFields(...args);
};

module.exports = fn;
