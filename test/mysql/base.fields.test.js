
const _ = require('../__lib/lodash');
const expect = require('chai').expect;

const nodber = require('../../src');
const tools = require('../__tools');

describe('MySQL - base/fields', () => {
	const table = 'users';

	tools.initNodber();
	tools.initDatabase();
	tools.createTableUsers();
	tools.addUsers();
	tools.breakLine();

	it(`.getFieldNames(table)`, async () => {
		const result = await nodber.getFieldNames(table);
		expect(result.length > 1 && result[0] === 'id').to.be.true;
	});

	it(`.getFieldsWhereConditions(primaryKeys)`, async () => {
		const primaryKeys = 'billid, itemno';
		const result = await nodber.getFieldsWhereConditions(primaryKeys);
		expect(result === 'billid = :billid and itemno = :itemno').to.be.true;
	});

	it(`.getFieldsWhereConditions(primaryKeys, {namePrefix})`, async () => {
		const primaryKeys = 'billid, itemno';
		const namePrefix = 'xxx_';
		const result = await nodber.getFieldsWhereConditions(primaryKeys, {namePrefix});
		expect(result === 'xxx_billid = :billid and xxx_itemno = :itemno').to.be.true;
	});

	it(`.getFieldsWhereConditions(primaryKeys, {valuePrefix})`, async () => {
		const primaryKeys = 'billid, itemno';
		const valuePrefix = 'old_';
		const result = await nodber.getFieldsWhereConditions(primaryKeys, {valuePrefix});
		expect(result === 'billid = :old_billid and itemno = :old_itemno').to.be.true;
	});

	it(`.getPrimaryKey()`, async () => {
		const result = await nodber.getPrimaryKey(table);
		expect(result === 'id').to.be.true;
	});

	it(`.getPrimaryKeys()`, async () => {
		const result = await nodber.getPrimaryKeys(table);
		const comparisonData = ['id', 'username'];
		expect(_.isEqualArray(result, comparisonData)).to.be.true;
	});

	it(`.isFieldExists()`, async () => {
		const field = 'isaverangers';
		const result = await nodber.isFieldExists(table, field);
		expect(result === true).to.be.true;
	});

});
