
const my = require('../../src');
const config = require('../__config/default');

const userTableName = config.testOptions.userTableName;

const me = {
	itInit() {
		it(`// init mypower`, async () => {
			my.init(config);
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
		await my.dropDatabase(databaseName);
		await my.createDatabase(databaseName);
		await my.useDatabase(databaseName);

		// Clean up the legacy test databases, the name is starting with databaseName + "_".
		const databasesName = await my.getDatabasesName();
		const reg = new RegExp("^" + databaseName + '_');
		for (let i = 0; i < databasesName.length; i ++) {
			const databaseName = databasesName[i];
			if (reg.test(databaseName)) {
				await my.dropDatabase(databaseName);
			}
		}
	},

	async createTableUsers(tableName) {
		tableName = tableName || userTableName;
		await my.dropTable(tableName);

		const fields = [
			{name: 'id', type: 'autoId'},
			{name: 'username', type: 'varchar', isNullable: false, isPrimaryKey: true},
			{name: 'password', type: 'varchar', length: 100},
			{name: 'isAvenger', type: 'boolean'},
			{name: 'brief', type: 'text'},
			{name: 'power', type: 'decimal', m: 12, d: 2},
			{name: 'areaId', type: 'id'},
			{name: 'type_tinytext', type: 'tinytext'},
			{name: 'type_text', type: 'text'},
			{name: 'type_mediumtext', type: 'mediumtext'},
			{name: 'type_longtext', type: 'longtext'},
			{name: 'type_tinyint', type: 'tinyint'},
			{name: 'type_smallint', type: 'smallint'},
			{name: 'type_int', type: 'int'},
			{name: 'type_bigint', type: 'bigint'},
			{name: 'type_float', type: 'float', m: 8, d: 4},
			{name: 'type_double', type: 'float'},
			{name: 'type_real', type: 'real'},
			{name: 'type_decimal', type: 'decimal'},
			{name: 'type_date', type: 'date'},
			{name: 'type_time', type: 'time'},
			{name: 'type_datetime', type: 'datetime'},
			{name: 'type_timestamp', type: 'timestamp'},
			{name: 'type_year', type: 'year'},
		];

		return await my.createTable(tableName, fields);
	},

	async addUsers(tableName) {
		tableName = tableName || userTableName;

		const sql = `
			insert into ${tableName} (id, username, isAvenger, brief, power, areaId)
			select 1 as id, 'owenLuke' as username, 1 as isAvenger, 'newbie' as brief, 1000000000.01 as power, 1 as areaId
			union
			select 2, 'steveRogers', 1, 'leader', null, null
			union
			select 3, 'anthonyStark', 1, null, null, null
			union
			select 4, 'thor', 1, null, null, null
			union
			select 5, 'hulk', 1, null, null, null
			union
			select 7, 'natasha', 1, null, null, null
			union
			select 10, 'thanos', 0, null, null, null
		`;

		return await my.exec(sql);
	},
};

module.exports = me;
