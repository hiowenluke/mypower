
/** @name nodber.getWarningCount */
const fn = async () => {
	const result = await global.nodber.proxy();
	// console.log('WarningCount', result[0].count);
	return result[0].count;
};

module.exports = fn;
