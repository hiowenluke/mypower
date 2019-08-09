
const me = {

	dialect: 'mysql',
	database: 'sys',
	username: 'root',
	password: 'playboy',
	host: '127.0.0.1',
	port: 3306,

	init(cfg) {
		Object.assign(this, cfg);
	},

	get() {
		return this;
	}
};

module.exports = me;
