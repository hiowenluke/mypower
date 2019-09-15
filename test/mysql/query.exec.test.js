
const nodber = require('../../src');
const expect = require('chai').expect;

const config = require('../__config/default');
const tools = require('../__tools');
const {itInit, it___________________________} = tools;

describe('MySQL - query/exec', async () => {
	const userTableName = config.testOptions.userTableName;

	itInit();
	it___________________________();

	it(`.exec(sql)`, async () => {
		const sql = `select * from ${userTableName}`;
		const result = await nodber.exec(sql);
		expect(result[0].id === 1).to.be.true;
	});

});
