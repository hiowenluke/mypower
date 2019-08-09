
/** @name nodber.getPrimaryKeysWhere */
const fn = (primaryKeys, {namePrefix = '', valuePrefix = ''}) => {

	// Standard usage (no xxxPrefix):
	// 		billid = :billid and itemno = :itemno

	// Use valuePrefix：
	// 		billid = :OLD_billid and itemno = :OLD_itemno

	const where = primaryKeys.map(key => namePrefix + key + ' = :' + valuePrefix + key);
	return where.join(' and ');
};

module.exports = fn;
