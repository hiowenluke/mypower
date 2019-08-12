
const nodber = require('../../src');
const expect = require('chai').expect;
const config = require('../__config/default');
const tools = require('../__tools');

describe('MySQL - lib/records', () => {
	const databaseName = config.testOptions.database;
	const tableName = 'users';

	tools.init(databaseName, tableName);
	tools.initTableUser();


});
