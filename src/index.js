
const nodber = require('kdo')();
const sequery = require('sequelize-raw-query');

Object.assign(nodber, nodber.crud);
Object.assign(nodber, nodber.crud.batch);
Object.assign(nodber, nodber.page);
Object.assign(nodber, nodber.goto);

Object.assign(nodber, nodber.base.database);
Object.assign(nodber, nodber.base.field);
Object.assign(nodber, nodber.base.primaryKey);
Object.assign(nodber, nodber.base.record);
Object.assign(nodber, nodber.base.system);
Object.assign(nodber, nodber.base.table);
Object.assign(nodber, nodber.base.tools);

Object.assign(nodber, nodber.__utils);

nodber.sequelizeOp = sequery.Sequelize.Op;

global.nodber = nodber;
module.exports.__proto__ = nodber;

