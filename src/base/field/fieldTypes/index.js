
/** @name my.fieldTypes */
const me = {

	char: ['char', 'varchar'],
	text: ['tinytext', 'text', 'mediumtext', 'longtext'],
	integer: ['tinyint', 'smallint', 'mediumint', 'int', 'bigint'],
	float: ['float', 'double', 'real', 'decimal'],
	datetime: ['date', 'time', 'datetime', 'timestamp', 'year'],
	binary: ['tinyblob', 'blob', 'mediumblob', 'longblob'],

	maxLength: {
		char: 255,
		varchar: 65535,
		tinytext: 255,
		text: 65535,
		mediumtext: 16777215,
		longtext: 4294967295,
	},

	defaultLength: {
		char: 255,
		varchar: 255,
		tinytext: 255,
		text: 65535,
		mediumtext: 65535,
		longtext: 65535,
	},

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

	isString(fieldType) {
		return this.isChar(fieldType) || this.isText(fieldType);
	},

	isNumber(fieldType) {
		return this.isInteger(fieldType) || this.isFloat(fieldType);
	}
};

module.exports = me;
