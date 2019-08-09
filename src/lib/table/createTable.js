
const nodber = require('../../');

const getFieldDefinitions = (fields) => {
	const def = [];
	const primaryKeys = [];

	fields.forEach(item => {
		let {name, type, length, notNull = false, isPrimaryKey = false} = item;

		notNull = notNull ? 'not null' : '';

		if (type === 'autoId') {
			def.push(`\`${name}\` int unsigned auto_increment`);
			isPrimaryKey = true;
		}

		else

		if (type === 'id') {
			def.push(`\`${name}\` int unsigned not null`);
			isPrimaryKey = true;
		}

		else

		if (type === 'string') {
			def.push(`\`${name}\` varchar(${length}) ${notNull}`);
		}

		else {
			def.push(`\`${name}\` ${type} ${notNull}`);
		}

		if (isPrimaryKey) {
			primaryKeys.push(name);
		}
	});

	def.push(`primary key ( \`${primaryKeys.join("\`, \`")}\` )`);
	return def;
};

/** @name nodber.createTable */
const fn = async (tableName, fields) => {
	if (await nodber.isTableExists(tableName)) {
		return false;
	}

	const fieldsStr = getFieldDefinitions(fields).join(', ');
	const options = 'engine=innodb default charset=utf8';

	const sql = nodber.sqls('createTable', tableName, {fields: fieldsStr, options});
	await nodber.exec(sql);

	// Use getWarningCount() instead of isSuccessful(), 'cause the count is 1, not 0.
	const count = await nodber.getWarningCount();
	return count === 1;
};

module.exports = fn;
