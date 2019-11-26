
const _ = require('../__lib/lodash');
const expect = require('chai').expect;

const my = require('../../src');
const tools = require('../__tools');
const {prepareForTesting, it___________________________} = tools;

describe('MySQL - tools', () => {

	prepareForTesting();
	it___________________________();

	it(`.getFieldsWhereConditions(primaryKeys)`, async () => {
		const primaryKeys = 'billid, itemno';
		const result = my.getFieldsWhereConditions(primaryKeys);
		expect(result === 'billid = :billid and itemno = :itemno').to.be.true;
	});

	it(`.getFieldsWhereConditions(primaryKeys, {namePrefix})`, async () => {
		const primaryKeys = 'billid, itemno';
		const namePrefix = 'xxx_';
		const result = my.getFieldsWhereConditions(primaryKeys, {namePrefix});
		expect(result === 'xxx_billid = :billid and xxx_itemno = :itemno').to.be.true;
	});

	it(`.getFieldsWhereConditions(primaryKeys, {valuePrefix})`, async () => {
		const primaryKeys = 'billid, itemno';
		const valuePrefix = 'old_';
		const result = my.getFieldsWhereConditions(primaryKeys, {valuePrefix});
		expect(result === 'billid = :old_billid and itemno = :old_itemno').to.be.true;
	});

	it(`.getTableNameFromSql() // for select `, async () => {
		const result = my.getTableNameFromSql(`select * from users`);
		expect(result === 'users').to.be.true;
	});

	it(`.getTableNameFromSql() // for insert `, async () => {
		const result = my.getTableNameFromSql(`insert into users (id, username) values(1, 'haha')`);
		expect(result === 'users').to.be.true;
	});

	it(`.getTableNameFromSql() // for update `, async () => {
		const result = my.getTableNameFromSql(`update users set username = 'owen' where id = 1`);
		expect(result === 'users').to.be.true;
	});

	it(`.getTableNameFromSql() // for delete `, async () => {
		const result = my.getTableNameFromSql(`delete from users where 1 = 0`);
		expect(result === 'users').to.be.true;
	});

});
