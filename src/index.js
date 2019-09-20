
const nodber = require('kdo')();
const sequery = require('sequelize-raw-query');

Object.assign(nodber, nodber.query.crud);
Object.assign(nodber, nodber.query.crud.batch);
Object.assign(nodber, nodber.query.paging);
Object.assign(nodber, nodber.query.goto);
Object.assign(nodber, nodber.query);

Object.assign(nodber, nodber.base.database);
Object.assign(nodber, nodber.base.field);
Object.assign(nodber, nodber.base.primaryKey);
Object.assign(nodber, nodber.base.record);
Object.assign(nodber, nodber.base.system);
Object.assign(nodber, nodber.base.table);

Object.assign(nodber, nodber.manager);
Object.assign(nodber, nodber.server);
Object.assign(nodber, nodber.tools);

nodber.sequelizeOp = sequery.Sequelize.Op;

global.nodber = nodber;
module.exports.__proto__ = nodber;

