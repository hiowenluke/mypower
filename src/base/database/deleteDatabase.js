
const nodber = require('../../');

/** @name nodber.deleteDatabase */
const fn = async (...args) => {
	return await nodber.dropDatabase(...args);
};

module.exports = fn;
