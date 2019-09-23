
const my = require('../..');

/** @name my.isSuccessful */
const fn = async (serverConfig) => {
	const count = await my.getWarningCount(serverConfig);

	// In general, the count is 0 means the operation is successful, exclude the below situation:
	// 		createTable // the count is 1

	return count === 0;
};

module.exports = fn;
