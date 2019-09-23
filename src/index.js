
const my = require('kdo')();
const sequery = require('sequelize-raw-query');

Object.assign(my, my.query.crud);
Object.assign(my, my.query.crud.batch);
Object.assign(my, my.query.paging);
Object.assign(my, my.query.goto);
Object.assign(my, my.query);

Object.assign(my, my.base.database);
Object.assign(my, my.base.field);
Object.assign(my, my.base.primaryKey);
Object.assign(my, my.base.record);
Object.assign(my, my.base.system);
Object.assign(my, my.base.table);

Object.assign(my, my.manager);
Object.assign(my, my.server);
Object.assign(my, my.tools);

my.sequelizeOp = sequery.Sequelize.Op;

module.exports.__proto__ = my;

