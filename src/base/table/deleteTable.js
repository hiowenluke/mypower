
const nodber = require('../..');

/** @name nodber.deleteTable */
const fn = async (...args) => {
	return await nodber.dropTable(...args);
};

module.exports = fn;
