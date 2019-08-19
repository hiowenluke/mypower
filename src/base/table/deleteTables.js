
const nodber = require('../../');

/** @name nodber.deleteTables */
const fn = async (...args) => {
	return await nodber.dropTables(...args);
};

module.exports = fn;
