
const me = {

	char: ['char', 'varchar'],
	text: ['tinytext', 'text', 'mediumtext', 'longtext'],
	integer: ['tinyint', 'smallint', 'mediumint', 'int', 'bigint'],
	float: ['float', 'double', 'real', 'decimal'],
	datetime: ['date', 'time', 'datetime', 'timestamp', 'year'],
	binary: ['tinyblob', 'blob', 'mediumblob', 'longblob'],

	_(typeName, fieldType) {
		return this[typeName].indexOf(fieldType) >= 0;
	},

	isChar(fieldType) {
		return this._('char', fieldType);
	},

	isText(fieldType) {
		return this._('text', fieldType);
	},

	isInteger(fieldType) {
		return this._('integer', fieldType);
	},

	isFloat(fieldType) {
		return this._('float', fieldType);
	},

	isDatetime(fieldType) {
		return this._('datetime', fieldType);
	},

	isBinary(fieldType) {
		return this._('binary', fieldType);
	},
};

module.exports = me;
