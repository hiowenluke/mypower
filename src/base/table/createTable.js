
const nodber = require('../..');

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
			const typeStr = nodber.convertFieldTypeDefToStr({type, length, m, d});
			def.push(`\`${name}\` ${typeStr} ${isNullableStr}`);
		}

		if (isPrimaryKey) {
			primaryKeys.push(name);
		}
	});

	def.push(`primary key ( \`${primaryKeys.join("\`, \`")}\` )`);
	return def;
};

/** @name nodber.createTable */
const fn = async (tableName, fieldDefinitions) => {
	if (await nodber.isTableExists(tableName)) {
		return false;
	}

	const fieldsDefStr = convertFieldDefinitionsToStr(fieldDefinitions).join(', ');
	const sql = nodber.sqls('createTable', tableName, {fields: fieldsDefStr});
	const result = await nodber.exec(sql);
	return result.warningStatus === 0;
};

module.exports = fn;
