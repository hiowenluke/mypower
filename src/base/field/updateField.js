
const nodber = require('../../');

/** @name nodber.updateField */
const fn = async (...args) => {
	return await nodber.changeField(...args);
};

module.exports = fn;
