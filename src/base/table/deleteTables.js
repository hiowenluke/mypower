
const my = require('../..');

/** @name my.deleteTables */
const fn = async (...args) => {
	return await my.dropTables(...args);
};

module.exports = fn;
