
/** @name nodber.getWarningCount */
const fn = async () => {
	const result = await global.nodber.proxy();
	return result[0].count;
};

module.exports = fn;
