
const nodber = require('../..');

/** @name nodber.batchInsert */
const fn = async (tableName, dataArr) => {

	if (!Array.isArray(dataArr)) {
		dataArr = [dataArr];
	}

	let result;
	for (let i = 0; i < dataArr.length; i ++) {
		const data = dataArr[i];
		result = await nodber.insert(tableName, data);
	}

	return result;
};

module.exports = fn;
