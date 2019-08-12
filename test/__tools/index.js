
const nodber = require('../../src');
const expect = require('chai').expect;
const config = require('../__config/default');

const me = {
	init(databaseName, tableNames) {
		it('init', async () => {
			nodber.init(config.use('mysql'));

			await nodber.createDatabase(databaseName);
			await nodber.useDatabase(databaseName);
			await nodber.dropTables(tableNames);
		});
	},

	initTableUser() {
		const tableName = 'users';
		it(`.createTable()`, async () => {
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
