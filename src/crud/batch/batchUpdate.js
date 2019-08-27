
const nodber = require('../..');

/** @name nodber.batchUpdate */
const fn = async (tableName, dataArr, whereArr) => {

	if (!Array.isArray(dataArr)) {
		dataArr = [dataArr];
		whereArr = [whereArr];
	}

	let result;
	for (let i = 0; i < dataArr.length; i ++) {
		const data = dataArr[i];
		const where = whereArr[i];
		result = await nodber.update(tableName, data, where);
	}

	return result;
};

module.exports = fn;
