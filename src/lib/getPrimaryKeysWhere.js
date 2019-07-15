
/** @name nodber.lib.getPrimaryKeysWhere */
const fn = (primaryKeys, {namePrefix = '', valuePrefix = ''}) => {

	// Standard usage (no xxxPrefix):
	// 		billid = :billid and itemno = :itemno

	// 使用 valuePrefix：
	// 		billid = :OLD_billid and itemno = :OLD_itemno

	const where = primaryKeys.map(key => namePrefix + key + ' = :' + valuePrefix + key);
	return where.join(' and ');
};

module.exports = fn;
