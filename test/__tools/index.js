
const nodber = require('../../src');
const expect = require('chai').expect;
const config = require('../__config/default');

const me = {
	initDatabase() {
		const databaseName = config.testOptions.database;

		it(`// init database`, async () => {
			nodber.init(config.use('mysql'));

			await nodber.createDatabase(databaseName);
			await nodber.useDatabase(databaseName);
		});
	},

	createTableUser() {
		const tableName = 'users';

		it(`// create table users`, async () => {
			await nodber.dropTable(tableName);

			const fields = [
				{name: 'id', type: 'autoId'},
				{name: 'username', type: 'string', length: 100, notNull: false, isPrimaryKey: true},
				{name: 'password', type: 'string', length: 100},
			];

			const result = await nodber.createTable(tableName, fields);
			expect(result === true).to.be.true;
		});
	}
};

module.exports = me;
