
const nodber = require('../../src');
const expect = require('chai').expect;
const config = require('../__config/default');

const me = {
	initNodber() {
		it(`// init nodber`, async () => {
			nodber.init(config.use('mysql'));
		});
	},

	initDatabase() {
		const databaseName = config.testOptions.database;

		it(`// init database`, async () => {
			await nodber.createDatabase(databaseName);
			await nodber.useDatabase(databaseName);
		});
	},

	createTableUsers() {
		const tableName = 'users';

		it(`// create table users`, async () => {
			await nodber.dropTable(tableName);

			const fields = [
				{name: 'id', type: 'autoId'},
				{name: 'username', type: 'string', length: 100, notNull: false, isPrimaryKey: true},
				{name: 'password', type: 'string', length: 100},
				{name: 'isaverangers', type: 'boolean'},
			];

			const result = await nodber.createTable(tableName, fields);
			expect(result === true).to.be.true;
		});
	},

	addUsers() {
		it('// add users', async () => {
			await nodber.exec(`
				insert into users (id, username, isaverangers)
				select 1 as id, 'owenLuke' as username, 1 as isaverangers
				union
				select 2, 'steveRogers', 1
				union
				select 3, 'anthonyStark', 1
				union
				select 4, 'thor', 1
				union
				select 5, 'hulk', 1
				union
				select 6, 'natasha', 1
				union
				select 7, 'thanos', 0
			`);
		});
	},

	breakLine() {
		it(`----------------------------`, async () => {});
	}
};

module.exports = me;
