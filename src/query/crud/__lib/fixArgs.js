
const _ = require('lodash');
const sequery = require('sequelize-raw-query');

/** @name lib.fixArgs */
const fn = ({tableName, fieldNames, whereStr}) => {
	if (!fieldNames) {
		fieldNames = "*";
	}
	else {
		if (Array.isArray(fieldNames)) {
			fieldNames = fieldNames.join(',');
		}
		else {
			// do nothing
		}
	}

	if (!whereStr) {
		whereStr = '1=1';
	}
	else {
		if (_.isPlainObject(whereStr)) {
			whereStr = sequery.getWhereConditions(whereStr, tableName);
		}
		else {
			if (typeof whereStr === 'string') {
				// do nothing
			}
			else {
				throw new Error('The whereStr argument must be a string or a plain object like {id, name}.');
			}
		}
	}

	return {tableName, fieldNames, whereStr};
};

module.exports = fn;
