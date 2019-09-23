
const my = require('../..');

// Six forms of fieldTypeDef:
//		'varchar(100)' 	or {type: 'varchar', length: 100}
//		'float(10, 2)' 	or {type: 'float', m: 10, d: 2}
//		'int' 			or {type: 'int'}

/** @name my.addField */
const fn = async (tableName, fieldName, fieldTypeDef) => {
	const fieldTypeStr = my.convertFieldTypeDefToStr(fieldTypeDef);
	const result = await my.proxy(tableName, {fieldName, fieldTypeStr});
	return result;
};

module.exports = fn;
