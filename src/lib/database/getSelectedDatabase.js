
const nodber = require('../../');

/** @name nodber.getSelectedDatabase */
const fn = async (databaseName) => {
	const result = await nodber.proxy(databaseName);
	return result[0].databasename ;
};

module.exports = fn;
