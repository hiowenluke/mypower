
const my = require('../..');

/** @name my.updateField */
const fn = async (...args) => {
	return await my.changeField(...args);
};

module.exports = fn;
