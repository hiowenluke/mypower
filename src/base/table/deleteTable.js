
const my = require('../..');

/** @name my.deleteTable */
const fn = async (...args) => {
	return await my.dropTable(...args);
};

module.exports = fn;
