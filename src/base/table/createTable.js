
const my = require('../..');

const convertFieldDefinitionsToStr = (definitions) => {
	const def = [];
	const primaryKeys = [];

	definitions.forEach(item => {
		let {name, type, length, m, d, isNullable = true, isPrimaryKey = false} = item;
		let isNullableStr = isNullable ? '' : 'not null';

		if (type === 'autoId') {
			def.push(`\`${name}\` int unsigned auto_increment`);
			isPrimaryKey = true;
		}

		else

		if (type === 'id') {
			def.push(`\`${name}\` int ${isNullableStr}`);
		}

		else {
			const typeStr = my.convertFieldTypeDefToStr({type, length, m, d});
			def.push(`\`${name}\` ${typeStr} ${isNullableStr}`);
		}

		if (isPrimaryKey) {
			primaryKeys.push(name);
		}
	});

	def.push(`primary key ( \`${primaryKeys.join("\`, \`")}\` )`);
	return def;
};

/** @name my.createTable */
const fn = async (tableName, fieldDefinitions) => {
	if (await my.isTableExists(tableName)) {
		return false;
	}

	const fieldsDefStr = convertFieldDefinitionsToStr(fieldDefinitions).join(', ');
	const sql = my.sqls('createTable', tableName, {fields: fieldsDefStr});
	const result = await my.exec(sql);
	return result.warningStatus === 0;
};

module.exports = fn;
