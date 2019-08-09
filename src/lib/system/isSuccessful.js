
/** @name nodber.isSuccessful */
const fn = async () => {
	return (await global.nodber.getWarningCount()) === 0;
};

module.exports = fn;
