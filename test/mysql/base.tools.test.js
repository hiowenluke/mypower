
const _ = require('../__lib/lodash');
const expect = require('chai').expect;

const nodber = require('../../src');
const tools = require('../__tools');
const {itInit, it___________________________} = tools;

describe('MySQL - base/fields', () => {

	itInit();
	it___________________________();

	it(`.getFieldsWhereConditions(primaryKeys)`, async () => {
		const primaryKeys = 'billid, itemno';
		const result = nodber.getFieldsWhereConditions(primaryKeys);
		expect(result === 'billid = :billid and itemno = :itemno').to.be.true;
	});

	it(`.getFieldsWhereConditions(primaryKeys, {namePrefix})`, async () => {
		const primaryKeys = 'billid, itemno';
		const namePrefix = 'xxx_';
		const result = nodber.getFieldsWhereConditions(primaryKeys, {namePrefix});
		expect(result === 'xxx_billid = :billid and xxx_itemno = :itemno').to.be.true;
	});

	it(`.getFieldsWhereConditions(primaryKeys, {valuePrefix})`, async () => {
		const primaryKeys = 'billid, itemno';
		const valuePrefix = 'old_';
		const result = nodber.getFieldsWhereConditions(primaryKeys, {valuePrefix});
		expect(result === 'billid = :old_billid and itemno = :old_itemno').to.be.true;
	});

	it(`.getTableNameFromSql() // for select `, async () => {
		const result = nodber.getTableNameFromSql(`select * from users`);
		expect(result === 'users').to.be.true;
	});

	it(`.getTableNameFromSql() // for insert `, async () => {
		const result = nodber.getTableNameFromSql(`insert into users (id, username) values(1, 'haha')`);
		expect(result === 'users').to.be.true;
	});

	it(`.getTableNameFromSql() // for update `, async () => {
		const result = nodber.getTableNameFromSql(`update users set username = 'owen' where id = 1`);
		expect(result === 'users').to.be.true;
	});

	it(`.getTableNameFromSql() // for delete `, async () => {
		const result = nodber.getTableNameFromSql(`delete from users where 1 = 0`);
		expect(result === 'users').to.be.true;
	});

});
