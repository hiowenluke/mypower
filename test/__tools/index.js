
const nodber = require('../../src');
const config = require('../__config/default');

const userTableName = config.testOptions.userTableName;

const me = {
	itInit() {
		it(`// init nodber`, async () => {
			nodber.init(config.use('mysql'));
		});

		it(`// init database`, async () => {
			await me.initDatabase();
		});

		it(`// create table ${userTableName}`, async () => {
			await me.createTableUsers();
		});

		it('// add users', async () => {
			await me.addUsers();
		});
	},

	it___________________________() {
		it(`----------------------------`, () => {});
	},

	async initDatabase() {
		const databaseName = config.testOptions.database;
		await nodber.dropDatabase(databaseName);
		await nodber.createDatabase(databaseName);
		await nodber.useDatabase(databaseName);
	},

	async createTableUsers(tableName) {
		tableName = tableName || userTableName;
		await nodber.dropTable(tableName);

		const fields = [
			{name: 'id', type: 'autoId'},
			{name: 'username', type: 'varchar', notNull: false, isPrimaryKey: true},
			{name: 'password', type: 'varchar', length: 100},
			{name: 'isAvengers', type: 'boolean'},
			{name: 'memo', type: 'text'},
		];

		await nodber.createTable(tableName, fields);
	},

	async addUsers(tableName) {
		tableName = tableName || userTableName;

		await nodber.exec(`
			insert into ${tableName} (id, username, isAvengers, memo)
			select 1 as id, 'owenLuke' as username, 1 as isAvengers, 'newbie' as memo
			union
			select 2, 'steveRogers', 1, 'leader'
			union
			select 3, 'anthonyStark', 1, ''
			union
			select 4, 'thor', 1, ''
			union
			select 5, 'hulk', 1, ''
			union
			select 6, 'natasha', 1, ''
			union
			select 7, 'thanos', 0, ''
		`);
	},
};

module.exports = me;
