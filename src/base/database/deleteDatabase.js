
const my = require('../..');

/** @name my.deleteDatabase */
const fn = async (...args) => {
	return await my.dropDatabase(...args);
};

module.exports = fn;
