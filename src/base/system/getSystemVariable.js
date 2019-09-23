
const my = require('../..');

/** @name my.getSystemVariable */
const fn = async (variableName, serverConfig) => {
	const result = await my.getSystemVariables(variableName, serverConfig);
	return result && result[0] ? result[0].Value : null;
};

module.exports = fn;
