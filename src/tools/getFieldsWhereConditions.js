
/** @name my.getFieldsWhereConditions */
const fn = (fieldNames, {namePrefix = '', valuePrefix = ''} = {}) => {

	// Standard usage (no xxxPrefix):
	// 		billid = :billid and itemno = :itemno

	// Use valuePrefix：
	// 		billid = :OLD_billid and itemno = :OLD_itemno

	if (typeof fieldNames === 'string') {

		// 'billid, itemno'
		if (fieldNames.indexOf(',') >= 0) {
			fieldNames = fieldNames.replace(/ /g, '');
			fieldNames = fieldNames.split(',');
		}
		else {
			// 'billid'
			fieldNames = [fieldNames];
		}
	}

	const whereConditions = fieldNames.map(key => namePrefix + key + ' = :' + valuePrefix + key);
	return whereConditions.join(' and ');
};

module.exports = fn;
