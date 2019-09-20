
const nodber = require('../..');
const config = require('../__config');

/** @name nodber.changeServer */
const fn = async (newConfig) => {

	if (!newConfig) {
		if (!config.backedupConfig) {
			throw new Error('Must specify the new server info');
		}
		else {
			// Use the backed up config as new config
			newConfig = config.backedupConfig;
		}
	}
	else {
		// Backup the original config
		config.backedupConfig = config;
	}

	return await nodber.connectServer(newConfig);
};

module.exports = fn;
