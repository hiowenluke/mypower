
const nodber = require('..');
const config = require('../__config');

/** @name nodber.switchToServer */
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

		// The newConfig is host name, not config
		if (typeof newConfig === 'string') {
			const host = newConfig;

			// Use current config
			newConfig = Object.create(config);

			// Replace the host with new value
			newConfig.host = host;
		}
	}

	return await nodber.connectServer(newConfig);
};

module.exports = fn;
