
const isNoWhere = (sqlStr) => {

	// Return true if there is no where in sqlStr
	if (!/\bwhere\b/i.test(sqlStr)) return true;

	// Check the last substring by the where separator string as an array
	const temp = sqlStr.split(/\bwhere\b/i);
	const lastStr = temp[temp.length - 1];

	// Count whether ( and ) in lastStr are the same:
	//		1. If it is different, it means that sqlStr ends with ")",
	//		   it is considered that there is no where clause.
	// 		2. If they are the same, it means sqlStr ends with a where clause.
	const countLeftBracket = (lastStr + "()").match(/\(/g).length;
	const countRightBracket = (lastStr + "()").match(/\)/g).length;

	// Note that the case where the nested select clause is nested is not considered here, for example:
	//		where (select name from table where 1=1)
	return countLeftBracket !== countRightBracket;
};

/** @name nodber.joinWhereStr */
const fn = (sqlStr, whereStr) => {
	if (!whereStr) return sqlStr;

	// Remove "where" at the beginning of whereStr
	whereStr = whereStr.replace(/^\s*where\b/i, '');

	// Use where connect if sqlStr has no where; otherwise use and connect
	const joiner = isNoWhere(sqlStr) ? " where " : " and ";
	return sqlStr + joiner + whereStr;
};

module.exports = fn;
