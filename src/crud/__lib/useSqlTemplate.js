
/** @name lib.useSqlTemplate */
const fn = (sqlTemplate, data = {}) => {
	let sql = sqlTemplate;
	Object.keys(data).forEach(key => {
		const reg = new RegExp(`{${key}}`, 'ig');
		sql = sql.replace(reg, data[key]);
	});
	return sql;
};

module.exports = fn;
