
const nodber = require('../..');

/** @name nodber.getSystemVariable */
const fn = async (variableName, serverConfig) => {
	const result = await nodber.getSystemVariables(variableName, serverConfig);
	return result && result[0] ? result[0].Value : null;
};

module.exports = fn;
