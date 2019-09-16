
const nodber = require('../..');

/** @name nodber.updateFields */
const fn = async (...args) => {
	return await nodber.changeFields(...args);
};

module.exports = fn;
