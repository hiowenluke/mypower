
const nodber = require('../../');

/** @name nodber.getSystemVariable */
const fn = async (variableName) => {
	const result = await nodber.getSystemVariables(variableName);
	return result && result[0] ? result[0].Value : null;
};

module.exports = fn;
