
const sequery = require('sequelize-raw-query');

/** @name my.exec */
const fn = async (...args) => {
	return await sequery.do(...args);
};

module.exports = fn;
