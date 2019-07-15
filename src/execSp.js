
const nodber = require('./');

/** @name nodber.execSp */
const fn = async (sql, replacements) => {

	// In the native sql statement, you need to use "select xxx as result" to specify the return value.
	const result = await nodber.exec(sql, {replacements});

	// Then use xxxx[0].result to get the return value here.
	return result ? result[0].result : null;
};

module.exports = fn;
