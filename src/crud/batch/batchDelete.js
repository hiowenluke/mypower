
const nodber = require('../..');

/** @name nodber.batchDelete */
const fn = async (tableName, whereArr) => {

	if (!Array.isArray(whereArr)) {
		whereArr = [whereArr];
	}

	let result;
	for (let i = 0; i < whereArr.length; i ++) {
		const where = whereArr[i];
		result = await nodber.delete(tableName, where);
	}

	return result;
};

module.exports = fn;
