
const myCli = require('mysql-cli-exec');
const config = require('../__config');

/** @name my.isServerOnline */
const fn = async (cfg) => {
	return await myCli.isOnline(cfg || config.get());
};

module.exports = fn;
