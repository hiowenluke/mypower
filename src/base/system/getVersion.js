
const nodber = require('../..');

/** @name nodber.getVersion */
const fn = async () => {
	const result = await nodber.proxy();
	return result[0].version;
};

module.exports = fn;
