
const sequery = require('sequelize-raw-query');

/** @name nodber.exec */
const fn = async (...args) => {
	return await sequery.do(...args);
};

module.exports = fn;
