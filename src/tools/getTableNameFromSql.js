
const match = (sql, reg) => {
	const test = sql.match(reg);
	return test ? test[1] : null;
};

const pickup = {
	fromSelect(sql) {
		return match(sql, /^\s*?select\b[\s\S]+?\bfrom\b\s+?\b(\S+?)\b/i);
	},

	fromDelete(sql) {
		return match(sql, /^\s*?delete\s+?from\b\s+?\b(\S+?)\b/i);
	},

	fromInsert(sql) {
		return match(sql, /^\s*?insert\s+?into\s+?(\S+?)\s*(?=\()/i);
	},

	fromUpdate(sql) {
		return match(sql, /^\s*?update\s+?\b([\S]+?)\b/i);
	}
};

/** @name my.getTableNameFromSql */
const fn = (sql) => {
	return pickup.fromSelect(sql) || pickup.fromDelete(sql) || pickup.fromInsert(sql) || pickup.fromUpdate(sql) || null;
};

module.exports = fn;
