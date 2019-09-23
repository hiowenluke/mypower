
const nodber = require('..');

/** @name nodber.connectServer */
const fn = async (newConfig) => {

	// Backup the new database
	const newDatabase = newConfig.database;

	// Use "sys" as default database at new server to avoid errors when the database is not exists
	newConfig.database = 'sys';
	await nodber.init(newConfig);

	// Change to new database
	if (newDatabase !== 'sys') {
		await nodber.useDatabase(newDatabase);
	}

	return true;
};

module.exports = fn;
