
const nodber = require('../../src');
const expect = require('chai').expect;
const config = require('../__config/default');
const tools = require('../__tools');

const createTable = async (tableName) => {
	await nodber.dropTable(tableName);

	const fields = [
		{name: 'id', type: 'autoId'},
		{name: 'username', type: 'varchar', notNull: false, isPrimaryKey: true},
		{name: 'password', type: 'varchar', length: 100},
		{name: 'isaverangers', type: 'boolean'},
		{name: 'memo', type: 'text'},
	];

	const result = await nodber.createTable(tableName, fields);
	return result;
};

const addUsers = async () => {
	await nodber.exec(`
				insert into users (id, username, isaverangers, memo)
				select 1 as id, 'owenLuke' as username, 1 as isaverangers, '' as memo
				union
				select 2, 'steveRogers', 1, ''
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
};

describe('MySQL - base/table', () => {
	const databaseName = config.testOptions.database;
	const tableName = 'users';

	tools.initNodber();
	tools.initDatabase();
	tools.breakLine();

	it(`.createTable()`, async () => {
		const result = await createTable(tableName);
		expect(result === true).to.be.true;
	});

	it(`.isTableExists()`, async () => {
		const result = await nodber.isTableExists(tableName);
		expect(result === true).to.be.true;
	});

	it(`.createTable() // false, 'cause it is exists`, async () => {
		const result = await nodber.createTable(tableName);
		expect(result === false).to.be.true;
	});

	it(`.showTables() // find the tableName in result array`, async () => {
		const result = await nodber.showTables(tableName);
		expect(!!result.find(item => item['Tables_in_' + databaseName] === tableName)).to.be.true;
	});

	it(`.descTable()`, async () => {
		const result = await nodber.descTable(tableName);
		expect(result[0].Field === 'id').to.be.true;
	});

	it(`.isEmptyTable() // false`, async () => {
		await nodber.exec(`insert into users (id, username) values(1, 'haha')`);
		const result = await nodber.isEmptyTable(tableName);
		expect(result === false).to.be.true;
	});

	it(`.truncateTable() and .isEmptyTable() // true`, async () => {
		await nodber.truncateTable(tableName);
		const result = await nodber.isEmptyTable(tableName);
		expect(result === true).to.be.true;
	});

	it(`.renameTable()`, async () => {
		const a = tableName;
		const b = tableName + '_123';
		await nodber.renameTable(a, b);
		const result = await nodber.renameTable(b, a);
		expect(result === true).to.be.true;
	});

	it(`.moveTable() // keep table name`, async () => {
		const from = databaseName;
		const to = 'sys';
		await nodber.moveTable(from, to, tableName);
		const result = await nodber.moveTable(to, from, tableName);
		expect(result === true).to.be.true;
	});

	it(`.moveTable() // rename table`, async () => {
		const fromDatabase = databaseName;
		const fromTable = tableName;
		const toDatabase = 'sys';
		const toTable = fromTable + '_123';
		await nodber.moveTable(fromDatabase, toDatabase, fromTable, toTable);
		const result = await nodber.moveTable(toDatabase, fromDatabase, toTable, fromTable);
		expect(result === true).to.be.true;
	});

	it(`.dropTable()`, async () => {
		const result = await nodber.dropTable(tableName);
		expect(result === true).to.be.true;
	});

	it(`.cloneTableStructure()`, async () => {
		await createTable(tableName);
		await addUsers();

		const newTableName = tableName + '_new';
		await nodber.dropTable(newTableName);
		await nodber.cloneTableStructure(newTableName, tableName);

		const result = await nodber.getFieldNames(newTableName);
		await nodber.dropTable(tableName);

		expect(result.length > 0).to.be.true;
	});

	it(`.cloneTableStructureAndData()`, async () => {
		await createTable(tableName);
		await addUsers();

		const newTableName = tableName + '_new';
		await nodber.dropTable(newTableName);
		await nodber.cloneTableStructureAndData(newTableName, tableName);

		const result = await nodber.select(newTableName);
		await nodber.dropTable(tableName);

		expect(result.length > 0).to.be.true;
	});

});
