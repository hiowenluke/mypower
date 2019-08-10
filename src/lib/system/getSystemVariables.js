
const nodber = require('../../');

/** @name nodber.getSystemVariables */
const fn = async (variableName) => {
	variableName = variableName ? `like "${variableName}"` : '';
	const result = await nodber.proxy({variableName});
	return result;
};

module.exports = fn;
