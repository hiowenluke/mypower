
const nodber = require('../../src');
const expect = require('chai').expect;
const tools = require('../__tools');

describe('MySQL - lib/records', () => {
	const databaseName = 'test_db_123';
	const tableName = 'users';

	tools.init(databaseName, tableName);
	tools.initTableUser();


});
